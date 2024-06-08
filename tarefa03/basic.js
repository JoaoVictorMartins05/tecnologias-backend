const express = require("express");
const router = express.Router();


router.get('/', (req,res) => {
    res.send("Olá, seja bem vindo!");
});


router.get('/sobre', (req,res) => {
    res.send("<h1>Página 'Sobre'.</h1><br/><p>Parágrafo teste</p>");
});


router.get('/ab[0-9]cd', (req,res) => {
    res.send("Expressão regular");
});



module.exports = router;