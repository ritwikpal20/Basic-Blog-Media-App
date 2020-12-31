const {
    createUser,
    getUserById,
    getUserByUsername,
} = require("../../src/controllers/users");

const { expect } = require("chai");

describe("src/controllers/users", () => {
    it("should create a user, provided a name,username,email and password", async () => {
        user = await createUser("Ritwik", "rp", "rp@gmail.com", "samplepass");
        expect(user.id).to.be.a("number");
        expect(user.name).to.equal("Ritwik");
        expect(user.username).to.equal("rp");
        expect(user.email).to.equal("rp@gmail.com");
        expect(user.password).to.equal("samplepass");
    });
    it("should throw error if passed empty values", async () => {
        await expect(
            createUser("Empty Username", "", "empty@gmail.com", "emppass")
        ).to.be.rejectedWith("Any of the fields cannot be empty");
    });
    it("should throw error if username already exits", async () => {
        await expect(
            createUser("Ritwik", "rp", "rp@gmail.com", "samplepass")
        ).to.be.rejectedWith("Username already used");
    });
    it("should return a user searched by a id", async function () {
        user = await getUserById(2);
        expect(user.id).to.equal(2);
    });
    it("should return user searched by username", async () => {
        user = await getUserByUsername("rp");
        expect(user.username).to.equal("rp");
    });
});
