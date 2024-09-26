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
        const postsWithCommentsAndUser = [];

        for (let post in paginatedPosts) {
            const postComments = await commentController.getComments(
                paginatedPosts[post].id
            );
            const user = await userController.getUser(
                paginatedPosts[post].userId
            );
            postsWithCommentsAndUser.push({
                ...paginatedPosts[post],
                user: user,
                comments: postComments,
            });
        }
        return postsWithCommentsAndUser;
    } catch (error) {
        throw new Error('Error fetching posts');
    }
};
