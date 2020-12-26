$("#btnLogin").click(() => {
    $.post(
        "/login",
        {
            username: $("#username").val(),
            password: $("#password").val(),
        },
        (loggedInUser) => {
            if (loggedInUser.error) {
                $(".error").text(loggedInUser.error);
            } else {
                $("#write-post").show();
                $("#my-posts").show();
                $("#content").load("../components/all-articles.html");
                $(".dropdown").html(`
                <button class="btn btn-outline-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                <span id="nav-username"></span>
                </button>
                <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="#">My Profile</a>
                <span class="dropdown-item spanLogout">Logout</span>
                `);
                $("#nav-username").text(loggedInUser.user.username);
                $(".spanLogout").click(() => {
                    console.log("logout clicked in login.js");
                    $.get("/logout", (data) => {
                        console.log("logout clicked in login.js 2");
                        $("#write-post").hide();
                        $("#my-posts").hide();
                        $(".dropdown").html(
                            `<a href="#" data-component='login' class='nav-link'>Login</a><a href="#" data-component='signup' class='nav-link'>Signup</a>`
                        );
                        $("#content").load("../components/all-articles.html");
                        navlinks = $(".nav-link");

                        navlinks.click((event) => {
                            console.log($(event.target).attr("data-component"));
                            componentUrl = `../components/${$(
                                event.target
                            ).attr("data-component")}.html`;
                            $("#content").load(componentUrl);
                        });
                    });
                });
            }
        }
    );
});
