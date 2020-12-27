$(() => {
    $("#navbar").load("../components/navbar.html", loginIfNeeded);
    $("#footer").load("../components/footer.html");
    $("#content").load("../components/all-articles.html");
});

function loginIfNeeded() {
    $.get("/login-check", (loggedInUser) => {
        if (!loggedInUser.user) {
            $("#write-post").hide();
            $("#my-posts").hide();
            $(".dropdown").html(
                `<a href="#" data-component='login' class='nav-link'>Login</a><a href="#" data-component='signup' class='nav-link'>Signup</a>`
            );
            navlinks = $(".nav-link");

            navlinks.click((event) => {
                console.log($(event.target).attr("data-component"));
                componentUrl = `../components/${$(event.target).attr(
                    "data-component"
                )}.html`;
                $("#content").load(componentUrl);
            });
        } else {
            $("#write-post").show();
            $("#my-posts").show();
            $("#nav-username").text(loggedInUser.user.username);
            $(".spanLogout").click(() => {
                console.log("logout clicked in common.js");
                $.get("/logout", (data) => {
                    console.log("logout clicked in common.js 2");
                    $("#write-post").hide();
                    $("#my-posts").hide();
                    $(".dropdown").html(
                        `<a href="#" data-component='login' class='nav-link'>Login</a><a href="#" data-component='signup' class='nav-link'>Signup</a>`
                    );
                    $("#content").load("../components/all-articles.html");
                    navlinks = $(".nav-link");

                    navlinks.click((event) => {
                        console.log($(event.target).attr("data-component"));
                        componentUrl = `../components/${$(event.target).attr(
                            "data-component"
                        )}.html`;
                        $("#content").load(componentUrl);
                    });
                });
            });
            // navlinks = $(".nav-link");

            // navlinks.click((event) => {
            //     console.log($(event.target).attr("data-component"));
            //     componentUrl = `../components/${$(event.target).attr(
            //         "data-component"
            //     )}.html`;
            //     $("#content").load(componentUrl);
            // });
        }
    });
}
