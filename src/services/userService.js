const axios = require('axios');

exports.fetchUser = async userId => {
    try {
        const response = await axios.get(
            `https://jsonplaceholder.typicode.com/users/${userId}`
        );
        const user = response.data;
        return user;
    } catch (error) {
        throw new Error('Error fetching posts');
    }
};
