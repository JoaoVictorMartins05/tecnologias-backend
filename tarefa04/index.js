const express = require("express");
const bodyparser = require("body-parser");
const pugMiddleware = require('express-pug');
const path = require("path")

const app = express();

// Configure o middleware do Pug
app.set('view engine', 'pug'); // Define o motor de template como Pug
const viewsPath = path.join(__dirname, 'views');
app.use(pugMiddleware({ root: viewsPath }));

// Porta da aplicação
const port = 3000;

// Usando BodyParser na rota /contact
app.use(bodyparser.urlencoded({extended: false}));
app.use('/contact', express.static(__dirname + '/public/contact'));


// POST de /contact
app.post('/contact', (req,res) => {
    console.log("Name: " + req.body.name);
    console.log("Email: " + req.body.email);
    console.log("Comment: " + req.body.comment);

    res.render("index");
});


// Rota Raiz
app.get('/', (req,res) => {
    res.send("Hello World!");
});


// Erro de acesso a outras rotas
app.get('*', (req,res) => {
    res.send("Link inválido: 404");
});


// Iniciando o Servidor
app.listen(port, ()=>{
    console.log(`Escutando na porta ${port}`);
})

