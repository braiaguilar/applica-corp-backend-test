const axios = require('axios');
const commentController = require('../controllers/commentController');

exports.fetchPostsWithPagination = async (start, size) => {
    try {
        const response = await axios.get(
            'https://jsonplaceholder.typicode.com/posts'
        );
        const allPosts = response.data;
        const paginatedPosts = allPosts.slice(start, start + size);
        const postsWithComments = [];

        for (let post in paginatedPosts) {
            const postComments = await commentController.getComments(
                paginatedPosts[post].id
            );
            postsWithComments.push({
                ...paginatedPosts[post],
                comments: postComments,
            });
        }
        return postsWithComments;
    } catch (error) {
        throw new Error('Error fetching posts');
    }
};
