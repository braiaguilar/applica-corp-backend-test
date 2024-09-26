const commentService = require('../services/commentService');

exports.getCommentsByPostId = async (postId, next) => {
    try {
        const comments = await commentService.fetchCommentsByPostId(postId);
        return comments;
    } catch (error) {
        next(error);
    }
};
