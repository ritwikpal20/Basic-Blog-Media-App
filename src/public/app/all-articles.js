// adding active class to currently opened link
nav_links = $(".nav-link");
nav_links = [...nav_links];
nav_links.forEach((link) => {
    $(link).removeClass("active");
});
$("#home").addClass("active");

function loadPosts() {
    $.get("/api/posts", (posts) => {
        $("#display-post").html("");
        for (p of posts) {
            $("#display-post")
                .append(`<div class="col-lg-4 col-md-6 col-8 card m-2" style="width: 18rem;display:inline-block;">
            <div class="card-body">
            <h5 class="card-title">${p.title}</h5>
            <hr>
            <h6 class="card-subtitle mb-2 text-muted">
            By - ${p.user.username}
            </h6>
            <p class="card-text">${p.body.split(" ").slice(0, 20).join(" ")}</p>
            <a href="#" class= "card-link read-more" data-component='comments' data-id='${
                p.id
            }'></a>
            <input class='inpComment' placeholder='type your comment here...'><button class='btnComment' data-id='${
                p.id
            }'>Comment</button>
            <br>
            <div class="card-header">
            <b>Comments</b>
            <br>
            <p class="card-text last_comment">
            </p>
            <a href="#" class="card-link show-comments" data-component='comments' data-id='${
                p.id
            }'>Show All Comments</a>
            </div>
            </div>
            </div>`);

            //Those posts have words more 20 , are not fully displayed
            nodes = $(".read-more");
            nodes = [...nodes];
            node = nodes[nodes.length - 1];
            if (p.body.split(" ").length > 20) $(node).text("Read Full Post");

            //Finding all the elements with class last_comment and selecting the last one , and viewing the lastest comment on each post
            nodes = document.querySelectorAll(".last_comment");
            node = nodes[nodes.length - 1];
            if (p.comments[p.comments.length - 1]) {
                node.innerText = p.comments[p.comments.length - 1].body;
            } else {
                node.innerHTML = `<p style="font-style:italic">no comments present</p>`;
            }
        }

        //opens the full post and view all the comments
        let openComments = $(".show-comments");
        openComments.click((event) => {
            console.log($(event.target).attr("data-id"));
            post_id = $(event.target).attr("data-id");

            componentUrl = `../components/comments.html`;
            $("#content").load(componentUrl);
        });
        let openPosts = $(".read-more");
        openPosts.click((event) => {
            console.log($(event.target).attr("data-id"));
            post_id = $(event.target).attr("data-id");

            componentUrl = `../components/comments.html`;
            $("#content").load(componentUrl);
        });

        //Adds a new comment and displays it
        $(".btnComment").click((event) => {
            btn = event.target;
            inp = btn.previousElementSibling;
            body = inp.value;
            $.get("login-check", (user) => {
                $.post(
                    "/api/posts/comments",
                    {
                        body: body,
                        userId: user.user.id,
                        postId: $(event.target).attr("data-id"),
                    },
                    (comment) => {
                        btn.nextElementSibling.nextElementSibling.children[2].innerText =
                            comment.body;
                    }
                );
            });
        });
    });
}
