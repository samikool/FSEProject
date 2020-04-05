var express = require('express');
var router = express.Router();

router.get('/', async function (req, res) {
  const authHeader = req.headers['authorization'];
  //console.log(authHeader);
  const token = authHeader && authHeader.split(' ')[1];
  //console.log(token)

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if(err){
      if(err.name === 'TokenExpiredError'){
        console.log('expired');
        res.json({reason: 'expired'});
      } else {
        console.log('invalid token');
        res.json(
          {
            access: false,
            reason: 'invalid token'
          })
      }

    } else {
      //console.log(user.email)
      //console.log(user.isAdmin)
      console.log('valid token');
      res.json(
        {
          access: true,
          email: user.email,
          admin: user.isAdmin
        });
    }
  });
});

router.post('/', async function(req, res) {
  refreshToken = req.body['token'];
  //frist verify token is valid by jwt standards
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async function(err, user){
    if(err) res.sendStatus(403);
    let email = user.email;
    let isAdmin = user.isAdmin;
    //second verify token is valid according to our database
    if(await database.ValidateToken(email, refreshToken)){
      //finally issue new access token
      const accessToken = await jwt.sign(
        {
          access: true,
          email: email,
          isAdmin: isAdmin},
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: '20m'
        }
      );
      res.json({accessToken: accessToken})
    }
  });
});

router.delete('/', async function(req, res){
  refreshToken = req.body['token'];
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, async function(err, user){
    if(err) res.sendStatus(403);

    database.RemoveToken(user.email, refreshToken);
    res.sendStatus(204);
  });
});

module.exports = router;
