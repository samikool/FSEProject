var express = require('express');
var router = express.Router();
var verifyToken = require('../authorizer').verifyToken;
var refreshToken = require('../authorizer').refreshToken;
var removeToken = require('../authorizer').removeToken;

router.get('/', async function (req, res) {
  const authHeader = req.headers['authorization'];
  //console.log(authHeader);
  const token = authHeader && authHeader.split(' ')[1];
  //console.log(token)
  return res.json(await verifyToken(token));
});

router.post('/', async function(req, res) {
  let token = req.body['token'];
  response = await refreshToken(token);
  console.log(response)
  return res.json(response);
});

router.delete('/', async function(req, res){
  token = req.body['token'];
  console.log("removing token");
  let success = await removeToken(token);
  if(success) res.sendStatus(204);
  else res.sendStatus(403);
  
});

module.exports = router;
