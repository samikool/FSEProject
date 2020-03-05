  
var express = require('express');
var router = express.Router();

router.post('/', async function (req, res) {
  var email = req.body['username'];
  var pw = req.body['password'];
  var query_str = `SELECT PASSWORD FROM USERS where email='${email}'`;
  console.log(query_str);

  let response = await database.login(email, pw);
  
  console.log(response);
  if(response == 0){
    res.send("Password was incorrect");
  }
  else if(response == 1){
    res.send("Password was correct");
  }
  else if(response == -1){
    res.send("Email doesn't exist");
  }else{
    res.send("Unknown error occured");
  }
    
});

module.exports = router;