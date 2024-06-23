const express = require("express");
const router = express.Router();
const bodyparser = require("body-parser");
const bcrypt = require('bcrypt');

// Tratar autenticação

const Pessoa = require("../models/pessoa") //importar a coleção
router.use(bodyparser.urlencoded({extended: false}));


router.post("/signup", (req, res) => {
    console.log("req.body => ", req.body)
    Pessoa.findOne({name: req.body.name, email: req.body.email, comment: req.body.comment})
    .then(
        doc_pessoa => {
            if(doc_pessoa)
                //caso já exista a pessoa
                return res.status(400).json({Error: "Comentário já existe no sistema."});
            else{
                //registrar
                const nova_pessoa = Pessoa({
                    name: req.body.name,
                    email: req.body.email,
                    senha: req.body.senha,
                    comment: req.body.comment,
                });

                //criptografar senha
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(nova_pessoa.senha, salt, function(err, hash) {
                        
                        if(err) throw err;
                        nova_pessoa.senha = hash;

                        nova_pessoa.save()
                        .then(pessoa => res.json(pessoa))
                        .catch((err) => console.log("erro em nova_pessoa.save() => ", err))
                    });
                });

            }
        }
    )
    .catch((err) => console.log("erro em signup => ", err))
})

module.exports = router;