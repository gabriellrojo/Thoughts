const bcrypt = require("bcryptjs")
const flash = require("express-flash")
const session = require("express-session")
const { redirect } = require("express/lib/response")
const User = require("../models/User")

module.exports = class AuthController {
    static login = (req, res) => {
        
        res.render("login")
    }
    
    static register = (req, res) => {
        res.render("register")
    }

    static registerUser = async (req, res) => {
        const name = req.body.name
        const email = req.body.email
        const password = req.body.password
        const confirmPassword = req.body.confirmpassword

        if(password !== confirmPassword){
            req.flash('message', 'As senhas devem ser iguais')
            res.redirect("/register")
            return
        }

        const userExists = await User.findOne({ where: {email: email} })

        if(userExists){
            req.flash('message', 'Usuário cadastrado')
            res.redirect('/register')
            return
        }

        const salt = bcrypt.genSaltSync(10) //10 -> num de bytes
        const hashPassword = bcrypt.hashSync(password, salt)

        const user = {
            name: name,
            email: email,
            password: hashPassword
        }

        const userCreated = await User.create(user)
        
        req.session.userid = userCreated.id

        req.session.save(() => {
            res.redirect("/")
        })
    
    }

    static logout = (req, res) => {
        req.session.destroy()
        res.redirect("/login")
    }

    static userLogin = async (req, res) => {
        const email = req.body.email
        const password = req.body.password

        const userExist = await User.findOne({where: {email: email}})

        if(!userExist){
            req.flash("message", "Usuário não cadastrado")
            res.redirect("/login")
            return
        }

        const passwordMatch = bcrypt.compareSync(password, userExist.password)
        
        if(!passwordMatch){
            req.flash("message", "Senha incorreta")
            res.redirect("/login")
            return
        }

        req.session.userid = userExist.id

        req.session.save(() => {
            res.redirect("/")
        })
    }
    
}