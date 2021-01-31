$("#btnSignup").click(() => {
    $.post(
        "/api/users",
        {
            name: $("#name").val(),
            username: $("#username").val(),
            email: $("#email").val(),
            password: $("#password").val(),
        },
        (user) => {
            if (user.error) {
                $(".error").text(user.error);
            } else {
                $("#content").load("../components/login.html");
            }
        }
    );
});
