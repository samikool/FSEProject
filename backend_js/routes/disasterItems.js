var express = require('express');
var router = express.Router();

router.post('/', async function (req, res) {

});

router.get('/', async function(req, res) {
  let itemList = await database.GetDisasterItems();
  

  res.json(itemList)
});

module.exports = router;