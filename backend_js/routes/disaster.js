var express = require('express');
var router = express.Router();

router.post('/', async function (req, res) {

});

router.get('/', async function(req, res) {
  let disasterList = await database.getAllDisasters();
  disasterList.forEach(element => {
    console.log(element)
  });
  res.json(disasterList)
});

module.exports = router;
