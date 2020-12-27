$.get("/api/posts/post", { id: post_id }, (post) => {
    $("#inpTitle").val(post.title);
    $("#inpBody").val(post.body);
    $("#inpSubmit").click(() => {
        $.post(
            "/api/posts/post",
            {
                id: post.id,
                title: $("#inpTitle").val(),
                body: $("#inpBody").val(),
            },
            (post) => {
                post_id = post.id;

                componentUrl = `../components/comments.html`;
                $("#content").load(componentUrl);
            }
        );
    });
});
