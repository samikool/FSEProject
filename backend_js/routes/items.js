var express = require('express');
var router = express.Router();

router.get('/', async function(req, res) {
    let itemList = await database.GetAllItems();
    res.json(itemList)
  });

module.exports = router;