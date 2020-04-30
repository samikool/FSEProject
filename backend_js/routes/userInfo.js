var express = require('express');
var router = express.Router();
var verifyToken = require('../authorizer').verifyToken;
var refreshToken = require('../authorizer').refreshToken;
var removeToken = require('../authorizer').removeToken;

router.post('/', async function (req, res) {
  const token = req.body['token'];
//   console.log("Token");
//   console.log(token);
  let check = await verifyToken(token);
  console.log("CHECK")
  console.log(check.email);
  let user_info = await database.GetUser(check.email);
  return res.json(user_info);
//   return res.json(await verifyToken(token));
});

module.exports = router;
