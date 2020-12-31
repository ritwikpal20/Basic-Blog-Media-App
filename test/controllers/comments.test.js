const {
    createNewComment,
    showComments,
} = require("../../src/controllers/comments");
const { expect } = require("chai");
const { createUser } = require("../../src/controllers/users");
const { createNewPost } = require("../../src/controllers/posts");

describe("src/controllers/comments", () => {
    it("should create a new comment provided body,userId and postId", async () => {
        user = await createUser(
            "Comment User",
            "commentuser",
            "comment@gmail.com",
            "compass"
        );
        post = await createNewPost(
            "a  post",
            "to test comments controller",
            user.id
        );
        comment = await createNewComment("a sample comment", user.id, post.id);
        expect(comment.body).to.equal("a sample comment");
        expect(comment.userId).to.equal(user.id);
        expect(comment.postId).to.equal(post.id);
    });
    it("should show comments under a post provided a postId", async () => {
        comments = await showComments(post.id);
        expect(comments[0].dataValues.body).to.equal("a sample comment");
    });
});
