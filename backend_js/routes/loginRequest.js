var createToken = require('../authorizer.js').createToken;
var express = require('express');
var router = express.Router();

router.post('/', async function (req, res) {
  var email = req.body['username'];
  var pw = req.body['password'];

  console.log(email);
  console.log(pw);

  let response = await database.VerifyUser(email, pw);

  console.log(response);

  if(!response.access){
    res.status(200).json({
      access: false,
	    reason: response.failure_reason
	  });
  } else if(response.access){

    tokens = await createToken(email, response.isAdmin, response.isDonor, response.isRequester);
    res.json(
      {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken
      });
  }
});

module.exports = router;
