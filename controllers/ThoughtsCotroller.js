const User = require("../models/User")
const Thought = require("../models/Thought")

module.exports = class ThoughtController {
    static showThoughts = async (req, res) => {
        res.render("home")
    }
}