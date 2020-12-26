const { Comments, Users, Posts } = require("../db/models");

async function createNewComment(body, userId, postId) {
    try {
        comment = await Comments.create({
            body: body,
            userId: userId,
            postId: postId,
        });
        //console.log(comment.dataValues);
        return comment;
    } catch (err) {
        console.log(err);
    }
}

async function showComments(userId, postId) {
    try {
        if (postId) {
            comments = await Comments.findAll({
                where: {
                    postId: postId,
                },
                include: [Users, Posts],
            });
        } else {
            comments = await Comments.findAll({
                where: {
                    userId: userId,
                },
                include: [Users, Posts],
            });
        }
        console.log("Output of showComments:", comments);
        return comments;
    } catch (err) {
        console.log(err);
    }
}

//createNewComment("Seocnd  Comment Under Second Post by 38  user id", 38, 2);
//showComments(1, null);

module.exports = {
    createNewComment,
    showComments,
};
