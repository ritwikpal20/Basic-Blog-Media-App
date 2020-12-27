$.get("/login-check", (data) => {
    if (data.user) {
        $(".card-header").text(`${data.user.name}`);
        $(".card-title").text(`Username : ${data.user.username}`);
        $(".card-text").text(`Email : ${data.user.email}`);
    }
});
