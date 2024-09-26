const axios = require('axios');
const userService = require('./userService');
const commentService = require('./commentService');

exports.fetchPostsWithPagination = async (start, size) => {
    try {
        const response = await axios.get(
            'https://jsonplaceholder.typicode.com/posts'
        );
        const allPosts = response.data;
        const paginatedPosts = allPosts.slice(start, start + size);

        const users = await userService.fetchAllUsers();

        const postsWithCommentsAndUser = await Promise.all(
            paginatedPosts.map(async post => {
                const user = users.find(u => u.id === post.userId);
                const comments = await commentService.fetchCommentsByPostId(
                    post.id
                );
                return { ...post, user, comments };
            })
        );

        return postsWithCommentsAndUser;
    } catch (error) {
        throw new Error('Error fetching posts');
    }
};
