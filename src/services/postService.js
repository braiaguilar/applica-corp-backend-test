const axios = require('axios');
const NodeCache = require('node-cache');
const userService = require('./userService');
const commentService = require('./commentService');

const userCache = new NodeCache({ stdTTL: 0 }); // "The blog site has a defined list of authors"
const commentCache = new NodeCache({ stdTTL: 600 }); // 10 mins. A reasonable TTL for comments that could potentially change
const postCache = new NodeCache({ stdTTL: 600 }); // 10 mins for posts. Same case as comments

exports.fetchPostsWithPagination = async (start, size) => {
    try {
        let allPosts = postCache.get('allPosts');
        if (!allPosts) {
            const response = await axios.get(
                'https://jsonplaceholder.typicode.com/posts'
            );
            allPosts = response.data;
            postCache.set('allPosts', allPosts);
        }

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

        return postsWithCommentsAndUser;
    } catch (error) {
        throw new Error('Error fetching posts');
    }
};
