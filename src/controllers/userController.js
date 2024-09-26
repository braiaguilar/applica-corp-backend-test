const userService = require('../services/userService');

exports.getUser = async (userId, next) => {
    try {
        const user = await userService.fetchUser(userId);
        return user;
    } catch (error) {
        next(error);
    }
};
