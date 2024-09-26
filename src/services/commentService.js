const axios = require('axios');

exports.fetchCommentsByPostId = async postId => {
    try {
        const response = await axios.get(
            `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
        );
        const postComments = response.data;
        return postComments;
    } catch (error) {
        throw new Error('Error fetching posts');
    }
};
