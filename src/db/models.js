const { Sequelize } = require("sequelize");
const db = new Sequelize("socialmediadb", "socialuser", "socialpass", {
    host: "localhost",
    dialect: "mysql",
});

const DataTypes = Sequelize.DataTypes;
const COL_ID_DEF = {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
};
const Users = db.define("user", {
    id: COL_ID_DEF,
    name: {
        type: DataTypes.STRING(100),
    },
    username: {
        type: DataTypes.STRING(100),
        unique: true,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
    },
    password: {
        type: DataTypes.STRING(100),
    },
});
const Posts = db.define("post", {
    id: COL_ID_DEF,
    title: {
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    body: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
});
const Comments = db.define("comment", {
    id: COL_ID_DEF,
    body: {
        type: DataTypes.TEXT("tiny"),
        allowNull: false,
    },
});

Users.hasMany(Posts);
Posts.belongsTo(Users);

Users.hasMany(Comments);
Comments.belongsTo(Users);

Posts.hasMany(Comments);
Comments.belongsTo(Posts);

module.exports = {
    db,
    Posts,
    Users,
    Comments,
};
