  
var express = require('express');
var router = express.Router();

router.post('/', async function (req, res) {
  var email = req.body['username'];
  var pw = req.body['password'];

  let response = await database.VerifyUser(email, pw);
  
  console.log(response);

  if(response.access == false){
    res.status(200).send("Could not login because: " + response.failure_reason + " does not exist");
  }
  else if(response.access == true){
    const accessToken = jwt.sign({email: email}, process.env.ACCESS_TOKEN_SECRET);
    res.json({accessToken: accessToken})
  }    
});

module.exports = router;
