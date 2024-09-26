const postService = require('../services/postService');

exports.getPosts = async (req, res, next) => {
    try {
        const { start = 0, size = 10 } = req.query;
        const posts = await postService.fetchPostsWithPagination(
            parseInt(start),
            parseInt(size)
        );
        res.status(200).json(posts);
    } catch (error) {
        next(error);
    }
};
