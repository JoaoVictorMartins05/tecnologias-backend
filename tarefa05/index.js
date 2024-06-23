//Server express
const express = require("express");
const app = express();

// Banco de Dados
const mongoose = require("mongoose");
const db_acess = require("./setup/db").mongoURL;

mongoose
.connect(db_acess)
.then(() => console.log("Conexão bem sucedida!"))
.catch((err) => console.log("Erro => ", err));


//login
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const auth = require("./routes/auth")
app.use("/auth", auth)

// Main page
app.use('/', express.static(__dirname + '/public/comment'));


// Porta da aplicação
const port = 3000;


// Iniciando o Servidor
app.listen(port, ()=>{
    console.log(`Escutando na porta ${port}`);
})


// Erro de acesso a outras rotas
app.get('*', (req,res) => {
    res.send("Link inválido: 404");
});

