const express = require("express")
const AuthController = require("../controllers/AuthController")

const route = express.Router()

route.get("/register", AuthController.register);
route.get("/login", AuthController.login)
route.post("/register", AuthController.registerUser)
route.get("/logout", AuthController.logout)
route.post("/login", AuthController.userLogin)

module.exports = route