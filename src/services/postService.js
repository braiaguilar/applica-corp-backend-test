const axios = require('axios');
const commentController = require('../controllers/commentController');
const userController = require('../controllers/userController');

exports.fetchPostsWithPagination = async (start, size) => {
    try {
        const response = await axios.get(
            'https://jsonplaceholder.typicode.com/posts'
        );
        const allPosts = response.data;
        const paginatedPosts = allPosts.slice(start, start + size);

        const postsWithCommentsAndUser = paginatedPosts.map(async post => {
            const user = await userController.getUser(post.userId);
            const comments = await commentController.getCommentsByPostId(
                post.id
            );
            return { ...post, user, comments };
        });

        return postsWithCommentsAndUser;
    } catch (error) {
        throw new Error('Error fetching posts');
    }
};
