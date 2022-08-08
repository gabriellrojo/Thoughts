const express = require("express")
const exphbs = require("express-handlebars")
const session = require("express-session")
const FileStore = require("session-file-store")(session)
const flash = require("express-flash")
const conn = require("./db/conn")
const path = require("path")
const User = require("./models/User")
const Thought = require("./models/Thought")
const route = require("./routes/thoughtsRoutes")
const ThoughtController = require("./controllers/ThoughtsCotroller")
const authRoute = require("./routes/authRoutes")

const app = express()

//template engine
app.engine("handlebars", exphbs.engine())
app.set("view engine", "handlebars")

//resposta do body (formulários) -> middleware
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())

app.use(express.static("public"))

//middleware responsável por salvar as sessões
app.use(session({
    name: "session",
    secret: "nosso_secret", //protege a sessão dos usuários
    resave: "false",
    //caso caia a sessão, não haverá reconecção
    saveUninitialized: "fase",
    store: new FileStore({ //local onde as sessões serão salvas
        logFn: function(){},
        path: path.resolve("sessions")
    }),
    cookie: {
        secure: false,
        maxAge: 360000, //tempo de duração: 1 dia. Depois ele deixa de ser válido
        expires: new Date(Date.now() + 360000), // depois de um dia ele expira automaticamente
        httpOnly: true
    }

}))

//flash message

app.use(flash())

app.use((req, res, next) => { //basicamente estamos pegando o userid (se ele existir) e salvando na res para podermos tê-lo em mãos sempre. Ao decorrer entenderei melhor,
    if(req.session.userid) {
        res.locals.session = req.session
    }

    next()
})

app.use("/", authRoute)
app.use("/thoughts", route)
app.get("/", ThoughtController.showThoughts)

conn
//.sync({ force: true }) //para o caso de precisar editar a nossa tabela. Ele apaga os dados e corrige o título das colunas atualizado em nosso model, por ex.
.sync()
.then(() => {
    app.listen(3000)
    console.log("Conexão efetuada com sucesso")
})
.catch(err => console.log(err))


