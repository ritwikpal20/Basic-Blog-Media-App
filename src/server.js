const express = require("express");
const session = require("express-session");
const { db, Users } = require("./db/models");
const { usersRoute } = require("./routes/users");
const { postsRoute } = require("./routes/posts/");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        resave: true,
        saveUninitialized: true,
        secret: "dkfnsooiohngwsvvef",
    })
);

app.use("/", express.static(__dirname + "/public"));
app.use("/api/users", usersRoute);
app.use("/api/posts", postsRoute);
app.get("/login-check", async (req, res) => {
    console.log("login-check session id:", req.session.userId);
    if (req.session.userId) {
        user = await Users.findByPk(req.session.userId);
        res.send({ user: user });
    } else res.send({ user: null });
});
app.post("/login", async (req, res) => {
    user = await Users.findOne({
        where: {
            username: req.body.username,
        },
    });
    if (!user) {
        return res.send({ error: "No such username" });
    }
    if (user.password != req.body.password) {
        return res.send({ error: "Wrong password" });
    }
    req.session.userId = user.id;
    res.send({ user: user });
});
app.get("/logout", (req, res) => {
    req.session.userId = null;
    console.log("req.session.userId", req.session.userId);
    res.send(null);
});

db.sync({ alter: true })
    .then(() => {
        app.listen(4000, () => {
            console.log("server started on http://localhost:4000");
        });
    })
    .catch((err) => {
        console.log(err);
    });
