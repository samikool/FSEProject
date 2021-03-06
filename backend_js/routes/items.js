var express = require('express');
var router = express.Router();

router.get('/', async function(req, res) {
    let itemList = await database.GetAllItems();
    res.json(itemList);
  });

router.post('/', async function(req, res){
    let item = req.body;
    console.log(item);

    await database.AddItem(item.name, item.category, '');
    item = await database.GetItemByName(item.name);
    res.json(item)
});
module.exports = router;
