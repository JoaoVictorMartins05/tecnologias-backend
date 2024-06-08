const express = require("express");
const router = express.Router();


router.post('/test_post', (req,res) => {
    res.send("POST PAGE");
});



module.exports = router;