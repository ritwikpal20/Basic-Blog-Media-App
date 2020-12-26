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
            $("#content").load("../components/login.html");
        }
    );
});
