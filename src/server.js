const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const session = require("express-session");
const bcrypt = require("bcrypt");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
    session({
        resave: true,
        saveUninitialized: true,
        secret: process.env.SESSION_SECRET,
        cookie: {
            maxAge: 24 * 60 * 60 * 1000,
        },
    })
);

app.use("/", express.static(__dirname + "/public"));
const { db, Users } = require("./db/models");
const { usersRoute } = require("./routes/users");
const { postsRoute } = require("./routes/posts/");
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
    // Load hash from your password DB.
    hash = user.password;
    bcrypt.compare(req.body.password, hash, function (err, result) {
        // result == true
        if (result == true) {
            req.session.userId = user.id;
            res.send({ user: user });
        } else {
            return res.send({ error: "Wrong password" });
        }
    });
});
app.get("/logout", (req, res) => {
    req.session.userId = null;
    console.log("req.session.userId", req.session.userId);
    res.send(null);
});

const PORT = process.env.PORT || 4000;
db.sync({ alter: true })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`server started on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err);
    });
