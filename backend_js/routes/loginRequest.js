  
var express = require('express');
var router = express.Router();

router.post('/', async function (req, res) {
  var email = req.body['username'];
  var pw = req.body['password'];

  let response = await database.login(email, pw);
  
  console.log(response);

  if(response == 0){
    res.status(200).send("Password was incorrrect");
  }
  else if(response == 1){
    const accessToken = jwt.sign({email: email}, process.env.ACCESS_TOKEN_SECRET);
    res.json({accessToken: accessToken})
  }
  else if(response == -1){
    res.send("Email doesn't exist");
  }else{
    res.send("Unknown error occured");
  }
    
});

module.exports = router;
