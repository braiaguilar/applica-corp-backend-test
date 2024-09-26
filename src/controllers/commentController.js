const commentService = require('../services/commentService');

exports.getComments = async (postId, next) => {
    try {
        const comments = await commentService.fetchCommentsByPostId(postId);
        return comments;
    } catch (error) {
        next(error);
    }
};
