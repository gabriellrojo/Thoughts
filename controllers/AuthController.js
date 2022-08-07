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
        const senha = req.body.senha
        const confirmpassword = req.body.confirmpassword
        
        if(senha != confirmpassword) {
            req.flash("message", "As senhas precisam ser iguais")
            
            res.render("register")
            return
        }
    }
}