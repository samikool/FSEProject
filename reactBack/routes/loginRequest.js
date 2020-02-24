var express = require('express');
var router = express.Router();

router.get("/", function(req, res, next){
    res.send("You did get");
});

router.post("/", function(req, res, next){
    console.log("Here");
    console.log(req.body['username']);
    res.send("You did post");

});

module.exports = router;

