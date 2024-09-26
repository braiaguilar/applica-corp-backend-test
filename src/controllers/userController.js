const userService = require('../services/userService');

exports.getUserById = async (userId, next) => {
    try {
        const user = await userService.fetchUserById(userId);
        return user;
    } catch (error) {
        next(error);
    }
};
