const express = require("express");
const router = express.Router();


router.get('/:p', (req,res) => {
    res.send("Você informou o parâmetro: "+ req.params.p);
});


router.get('/user/:u/nome/:n', (req,res) => {
    res.send("Você acessou informações do usuário "+ req.params.u + " com o nome " + req.params.n);
});


module.exports = router;