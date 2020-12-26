const { Router } = require("express");
const { createNewPost, showPosts } = require("../../controllers/posts");
const { commentsRoute } = require("./comment");

const route = Router();

route.use("/comments", commentsRoute);

route.get("/", async (req, res) => {
    console.log("id received:", req.query.id);
    posts = await showPosts(req.query.id);
    res.status(200).send(posts);
});

route.post("/", async (req, res) => {
    try {
        const { title, body, userId } = req.body;
        if (!title || !body || !userId) {
            res.status(400).send("Needs valids title , body and userId");
        }
        post = await createNewPost(title, body, userId);
        res.status(201).send(post);
    } catch (err) {
        res.status(400).send("Error raised");
    }
});

module.exports = {
    postsRoute: route,
};
