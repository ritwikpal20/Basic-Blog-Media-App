const { Users } = require("../db/models");

async function createUser(name, username, email, password) {
    if (name == "" || username == "" || email == "" || password == "") {
        throw new Error("Any of the fields cannot be empty");
    }
    if (await getUserByUsername(username)) {
        throw new Error("Username already used");
    }
    user = await Users.create({
        name: name,
        username: username,
        email: email,
        password: password,
    });
    return user;
}

async function getUserById(id) {
    if (!id) {
        throw new Error("User id should be provided");
    }
    if (typeof id != "number") {
        throw new Error("User id should be integer");
    }
    user = await Users.findOne({
        where: {
            id: id,
        },
    });
    return user;
}

async function getUserByUsername(username) {
    if (typeof username != "string") {
        throw new Error("username should be string");
    }
    user = await Users.findOne({
        where: {
            username: username,
        },
    });
    return user;
}

module.exports = {
    getUserById,
    getUserByUsername,
    createUser,
};
