const axios = require('axios');

exports.fetchPostsWithPagination = async (start, size) => {
    try {
        const response = await axios.get(
            'https://jsonplaceholder.typicode.com/posts'
        );
        const allPosts = response.data;
        const paginatedPosts = allPosts.slice(start, start + size);
        return paginatedPosts;
    } catch (error) {
        throw new Error('Error fetching posts');
    }
};
