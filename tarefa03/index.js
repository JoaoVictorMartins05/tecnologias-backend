const express = require("express");
const app = express();

const port = 3000;

const basic_module = require("./basic.js");
app.use('/', basic_module);

const json_module = require("./json.js");
app.use('/', json_module);

const params_module = require("./params.js");
app.use('/', params_module);


const post_module = require("./post.js");
app.use('/', post_module);


app.get('*', (req,res) => {
    res.send("Link inválido: 404");
});


app.listen(port, ()=>{
    console.log(`Escutando na porta ${port}`);
})

