const { Posts, Users, Comments } = require("../db/models");

async function createNewPost(title, body, userId) {
    try {
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
        if (query) {
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
};
