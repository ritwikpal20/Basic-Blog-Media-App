const { Posts, Users, Comments } = require("../db/models");

async function createNewPost(title, body, userId) {
    try {
        if (title == "" || body == "" || userId == 0) {
            throw new Error("Fields cannot be empty");
        }
        if (!title || !body || !userId) {
            throw new Error("All fields required");
        }
        post = await Posts.create({
            title: title,
            body: body,
            userId: userId,
        });
        return post;
    } catch (err) {
        console.log(err);
    }
}

async function showPosts(query) {
    try {
        if (typeof query == "number") {
            posts = await Posts.findAll({
                where: {
                    userId: parseInt(query),
                },
                include: [Users, Comments],
            });
        } else {
            posts = await Posts.findAll({
                include: [Users, Comments],
            });
        }
        return posts;
    } catch (err) {
        console.log(err);
    }
}

async function deletePost(query) {
    try {
        post = await Posts.findOne({
            where: {
                id: query,
            },
        });
        await post.destroy();
    } catch (err) {
        console.log(err);
    }
}

async function getAPost(query) {
    try {
        post = await Posts.findOne({
            where: {
                id: query,
            },
        });
        return post;
    } catch (err) {
        console.log(err);
    }
}
// async function test() {
//     posts = await showPosts();
//     for (post of posts) {
//         console.log(
//             "Title:",
//             post.title,
//             "\tBody:",
//             post.body,
//             "\tauthor:",
//             post.user.username
//         );
//     }
// }
// test();

module.exports = {
    createNewPost,
    showPosts,
    deletePost,
    getAPost,
};
