const bcrypt = require("bcrypt");
const { Router } = require("express");
const {
    createUser,
    getUserById,
    getUserByUsername,
} = require("../../controllers/users");

const route = Router();
route.get("/:id", async (req, res) => {
    try {
        console.log(req.params.id);
        if (isNaN(parseInt(req.params.id))) {
            user = await getUserByUsername(req.params.id);
        } else {
            user = await getUserById(parseInt(req.params.id));
        }
        if (user == null) res.status(404).send("No match");
        else res.status(200).send(user);
    } catch (err) {
        res.status(404).send({
            error: "Not Found such username or id",
        });
    }
});
saltRounds = parseInt(process.env.SALT_ROUNDS);
route.post("/", async (req, res) => {
    try {
        if (await getUserByUsername(req.body.username)) {
            return res.send({ error: "Username already exists" });
        } else {
            bcrypt.hash(
                req.body.password,
                saltRounds,
                async function (err, hash) {
                    if (err) {
                        console.log(err);
                    } else {
                        user = await createUser(
                            req.body.name,
                            req.body.username,
                            req.body.email,
                            hash
                        );
                        res.status(201).send(user);
                    }
                }
            );
        }
    } catch (err) {
        console.log(err);
    }
});

module.exports = {
    usersRoute: route,
};
