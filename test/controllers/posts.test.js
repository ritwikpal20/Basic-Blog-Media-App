const {
    createNewPost,
    showPosts,
    deletePost,
    getAPost,
} = require("../../src/controllers/posts");
const { createUser } = require("../../src/controllers/users");
const { expect } = require("chai");

describe("src/controllers/posts", function () {
    it("should create new post given a title , body and userId", async () => {
        user = await createUser(
            "test name",
            "testuser",
            "test@gmail.com",
            "testpassword"
        );
        post = await createNewPost("test post", "test body", user.id);
        expect(post.title).to.equal("test post");
        expect(post.body).to.equal("test body");
        expect(post.id).to.equal(user.id);
    });
    it("should show all posts if no query is passed", async () => {
        user2 = await createUser(
            "test name 2",
            "testuser2",
            "test2@gmail.com",
            "testpassword2"
        );
        post = await createNewPost("test post 2", "test body 2", user2.id);
        posts = await showPosts();
        expect(posts).to.have.lengthOf(3);
    });
    it("should show posts by a specific user", async () => {
        posts = await showPosts(user.id);
        expect(posts).to.have.lengthOf(1);
        expect(posts[0].dataValues.id).to.equal(user.id);
    });
    it("should delete a post given a post id", async () => {
        await deletePost(1);
        post = await getAPost(1);
        expect(post).to.be.a("null");
    });
    it("should get a post given a post id", async () => {
        post = await getAPost(2);
        expect(post.id).to.equal(2);
    });
});
