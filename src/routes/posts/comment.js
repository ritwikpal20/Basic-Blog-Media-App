const route = require("express").Router();
const {
    createNewComment,
    showComments,
} = require("../../controllers/comments");
const { showPosts } = require("../../controllers/posts");
route.get("/", async (req, res) => {
    try {
        console.log("values received:", req.query.userId, req.query.postId);
        comments = await showComments(req.query.userId, req.query.postId);
        res.status(200).send(comments);
    } catch (err) {
        console.status(400).log(err);
    }
});
route.post("/", async (req, res) => {
    try {
        comment = await createNewComment(
            req.body.body,
            req.body.userId,
            req.body.postId
        );
        res.status(201).send(comment);
    } catch (err) {
        console.status(400).log(err);
    }
});

module.exports = {
    commentsRoute: route,
};
