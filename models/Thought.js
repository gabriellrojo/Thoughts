const { DataTypes } = require("sequelize")
const User = require("./User")
const conn = require("../db/conn")

const Thought = conn.define("Thought", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        require: true
    }
})

User.hasMany(Thought)
Thought.belongsTo(User)

module.exports = Thought