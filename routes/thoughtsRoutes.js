const express = require("express")
const ThoughtController = require("../controllers/ThoughtsCotroller")
const route = express.Router()

route.get("/", ThoughtController.showThoughts)

module.exports = route