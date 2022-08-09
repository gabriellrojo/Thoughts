const express = require("express")
const ThoughtController = require("../controllers/ThoughtsCotroller")
const auth = require("../helpers/auth")
const route = express.Router()


route.get("/", ThoughtController.showThoughts)
route.get("/dashboard", auth, ThoughtController.dashboard)
route.get("/add", auth, ThoughtController.addThought)
route.post("/add", ThoughtController.saveThought)
route.post("/delete", ThoughtController.delete)
route.get("/edit/:id", ThoughtController.edit)
route.post("/edit", ThoughtController.editPost)

module.exports = route