const axios = require('axios');
const userService = require('./userService');
const commentService = require('./commentService');
const { userCache, commentCache, postCache } = require('../utils/cache');
const {
    InvalidPaginationError,
    ExternalApiError,
    NotFoundError,
} = require('../utils/errorHandler');

exports.fetchPostsWithPagination = async (start, size) => {
    try {
        if (!Number.isInteger(start) || start < 0) {
            throw new InvalidPaginationError(
                'Invalid start parameter. It must be a positive number.'
            );
        }
        if (!Number.isInteger(size) || size <= 0) {
            throw new InvalidPaginationError(
                'Invalid size parameter. It must be a positive number greater than 0'
            );
        }

        let allPosts = postCache.get('allPosts');
        if (!allPosts) {
            try {
                const response = await axios.get(
                    'https://jsonplaceholder.typicode.com/posts'
                );
                if (!response.data || response.status !== 200) {
                    throw new ExternalApiError('Error fetching posts');
                }
                allPosts = response.data;
                postCache.set('allPosts', allPosts);
            } catch (error) {
                console.error('API Error:', error.message);
                throw new ExternalApiError(
                    'Failed to retrieve posts from external API'
                );
            }
        }
        // const postsQuantity = allPosts.length;

        // if (start >= postsQuantity) {
        //     throw new InvalidPaginationError(
        //         'Invalid start parameter. Start index exceeds the number of available posts'
        //     );
        // }

        const paginatedPosts = allPosts.slice(start, start + size);

        let users = userCache.get('users');
        if (!users) {
            users = await userService.fetchAllUsers();
            userCache.set('users', users);
        }

        const postsWithCommentsAndUser = await Promise.all(
            paginatedPosts.map(async post => {
                const user = users.find(u => u.id === post.userId);

                let comments = commentCache.get(`comments_${post.id}`);
                if (!comments) {
                    comments = await commentService.fetchCommentsByPostId(
                        post.id
                    );
                    commentCache.set(`comments_${post.id}`, comments);
                }

                return { ...post, user, comments };
            })
        );

        if (!postsWithCommentsAndUser.length) {
            throw new NotFoundError('No posts found');
        }

        return postsWithCommentsAndUser;
    } catch (error) {
        throw new Error(error.message);
    }
};
