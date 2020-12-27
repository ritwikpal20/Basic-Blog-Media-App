const { Router } = require("express");
const {
    createNewPost,
    showPosts,
    deletePost,
    getAPost,
} = require("../../controllers/posts");
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

route.get("/delete", async (req, res) => {
    try {
        await deletePost(req.query.id);
        res.status(204).send("Post deleted");
    } catch (err) {
        res.status(400).send("Error deleting Post");
    }
});

route.get("/post", async (req, res) => {
    try {
        post = await getAPost(req.query.id);
        res.status(200).send(post);
    } catch (err) {
        console.log(err);
    }
});
route.post("/post", async (req, res) => {
    try {
        post = await getAPost(req.body.id);
        post.title = req.body.title;
        post.body = req.body.body;
        await post.save();
        res.status(200).send(post);
    } catch (err) {
        console.log(err);
    }
});

module.exports = {
    postsRoute: route,
};
