const User = require("../models/User")
const Thought = require("../models/Thought")
const flash = require("express-flash")

module.exports = class ThoughtController {
    static showThoughts = async (req, res) => {

        const thoughts = await Thought.findAll({include: User})
        const thoughtsData = thoughts.map(data => data.get({ plain: true })) //esse método joga todos os dados no mesmo array. Thought e User)
        try{
            res.render("home", { thoughtsData })
        } catch(error){
            console.log(error)
        }

    }

    static dashboard = async (req, res) => {
        const userid = req.session.userid
        
        const thoughtsUser = await Thought.findAll({raw: true, where:{UserId: userid}})

        if(thoughtsUser.length === 0){
            req.flash("message", "Nenhum pensameto criado. Crie o seu primeiro pensamento.")
        }

        req.session.save(() => {
            res.render("dashboard", { thoughtsUser })
        })
        
        
    }

    static addThought = (req, res) => {
        res.render("add")
    }

    static saveThought = async (req, res) => {
        const title = req.body.title
        const iduser = req.session.userid

        const thought = {
            title: title,
            UserId: iduser
        }

        
        await Thought.create(thought)

        req.session.save(() => {
            res.redirect("/thoughts/dashboard")
        })        

    }

    static delete = async(req, res) => {
        const id = req.body.id


        await Thought.destroy({where: {id: id}})

        req.session.save(() => {
            res.redirect("/thoughts/dashboard")
        })
    }

    static edit = async (req, res) => {
        const id = req.params.id

        const thoughtUser = await Thought.findOne({raw: true, where: {id: id}})
        
        res.render("edit", { thoughtUser })
    }

    static editPost = async (req, res) => {
        //const id = req.params.id esse ID refere-se ao GET. Não vai funcionar
        const id = req.body.id
        const title = req.body.title
        const iduser = req.session.userid

        const editPost = {
            title: title,
            UserId: iduser
        }

        await Thought.update(editPost, {where: {id: id}})

        req.session.save(() => {
            res.redirect("/thoughts/dashboard")
        })

    }

}