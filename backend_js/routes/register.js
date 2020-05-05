var express = require('express');
var router = express.Router();

router.post('/', async function (req, res) {
   req = req.body;
   console.log('registering user');
   response = await database.NewUser(
     req.firstName,
     req.lastName,
     req.password,
     req.email,
     {
       Address: req.streetAddress,
       City: req.city,
       State: req.state,
       Zipcode: req.zipcode,
       Country: req.country
     },
     false,
     req.donor,
     req.requester
   );
   console.log(response);
   res.json(response)
});

module.exports = router;
