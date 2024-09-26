const axios = require('axios');

exports.fetchUserById = async userId => {
    try {
        const response = await axios.get(
            `https://jsonplaceholder.typicode.com/users/${userId}`
        );
        const user = response.data;
        return user;
    } catch (error) {
        throw new Error('Error fetching user');
    }
};

exports.fetchAllUsers = async () => {
    try {
        const response = await axios.get(
            `https://jsonplaceholder.typicode.com/users`
        );
        const users = response.data;
        return users;
    } catch (error) {
        throw new Error('Error fetching users');
    }
};
