var express = require('express');
var router = express.Router();

router.post('/', async function (req, res) {

});

router.get('/', async function(req, res) {
  let disasterList = await database.getAllDisasters();
  res.json(disasterList)
});

module.exports = router;
