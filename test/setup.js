process.env.NODE_ENV = "testing";
const { db } = require("../src/db/models");

before(async function () {
    await db.sync({ force: true });
});
