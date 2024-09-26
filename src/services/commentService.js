const axios = require('axios');
const { ExternalApiError } = require('../utils/errorHandler');

exports.fetchCommentsByPostId = async postId => {
    try {
        const response = await axios.get(
            `https://jsonplaceholder.typicode.com/posts/${postId}/comments`
        );
        if (!response.data || response.status !== 200) {
            throw new ExternalApiError('Error fetching comments');
        }
        const postComments = response.data;
        return postComments;
    } catch (error) {
        console.error('API Error:', error.message);
        throw new ExternalApiError(
            'Failed to retrieve comments from external API'
        );
    }
};
