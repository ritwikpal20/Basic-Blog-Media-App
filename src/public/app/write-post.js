// adding active class to currently opened link
nav_links = $(".nav-link");
nav_links = [...nav_links];
nav_links.forEach((link) => {
    $(link).removeClass("active");
});
$("#write-post").addClass("active");

inpSubmit = $("#inpSubmit");
inpTitle = $("#inpTitle");
inpBody = $("#inpBody");

inpSubmit.click(function () {
    $.get("/login-check", (user) => {
        $.post(
            "/api/posts",
            {
                title: inpTitle.val(),
                body: inpBody.val(),
                userId: user.user.id,
            },
            (post) => {
                $("#content").load("../components/all-articles.html");
            }
        );
    });
});
