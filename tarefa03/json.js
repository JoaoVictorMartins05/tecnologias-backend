const express = require("express");
const router = express.Router();


router.get('/json', (req,res) => {
    res.status(200).json({usuario: "joao", id: 99999})
});


module.exports = router;