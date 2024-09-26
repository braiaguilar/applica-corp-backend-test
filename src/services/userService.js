const axios = require('axios');

exports.fetchUserById = async userId => {
    try {
        const response = await axios.get(
            `https://jsonplaceholder.typicode.com/users/${userId}`
        );
        if (!response.data || response.status !== 200) {
            throw new Error('Error fetching user');
        }
        const user = response.data;
        return user;
    } catch (error) {
        console.error('API Error:', error.message);
        throw new Error('Failed to retrieve user from external API');
    }
};

exports.fetchAllUsers = async () => {
    try {
        const response = await axios.get(
            `https://jsonplaceholder.typicode.com/users`
        );
        if (!response.data || response.status !== 200) {
            throw new Error('Error fetching users');
        }
        const users = response.data;
        return users;
    } catch (error) {
        console.error('API Error:', error.message);
        throw new Error('Failed to retrieve users from external API');
    }
};
