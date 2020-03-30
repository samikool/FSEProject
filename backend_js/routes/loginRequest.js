var express = require('express');
var router = express.Router();

router.post('/', async function (req, res) {
  var email = req.body['username'];
  var pw = req.body['password'];

  let response = await database.VerifyUser(email, pw);
  
  console.log(response);

  if(response.access == false){
    res.status(200).json({
      access: false, 
	    reason: response.failure_reason
	  });
  }
  else if(response.access == true){
    const accessToken = await jwt.sign(
      {email: email, isAdmin: response.isAdmin},
        process.env.ACCESS_TOKEN_SECRET, 
        {expiresIn: '20m'}
    );

    const refreshToken = await jwt.sign(
      {email: email, isAdmin: response.isAdmin},
      process.env.REFRESH_TOKEN_SECRET
    );

    await database.StoreToken(email, refreshToken);

    res.json({accessToken: accessToken, refreshToken: refreshToken})
  }
});

module.exports = router;
