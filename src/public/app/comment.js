$.get("/api/posts/", { id: post_id.userId }, (posts) => {
    for (post of posts) {
        if (post.id == post_id) {
            $(".p-title").text(`${post.title}`);
            $(".p-username").text(`By-${post.user.username}`);
            $(".p-body").text(`${post.body}`);
        }
    }
});
$.get("/api/posts/comments", { userId: null, postId: post_id }, (comments) => {
    console.log(comments);
    for (comment of comments) {
        $(".comment-list").append(`
            <li>${comment.body} -By ${comment.user.username}</li>
        `);
    }
});
