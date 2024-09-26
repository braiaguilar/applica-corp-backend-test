const NodeCache = require('node-cache');

const userCache = new NodeCache({ stdTTL: 0 }); // "The blog site has a defined list of authors"
const commentCache = new NodeCache({ stdTTL: 600 }); // 10 mins. A reasonable TTL for comments that could potentially change
const postCache = new NodeCache({ stdTTL: 600 }); // 10 mins for posts. Same case as comments

module.exports = {
    userCache,
    commentCache,
    postCache,
};
