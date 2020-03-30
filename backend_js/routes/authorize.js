var express = require('express');
var router = express.Router();

router.get('/', async function (req, res) {
    const authHeader = req.headers['authorization']
    //console.log(authHeader);
    const token = authHeader && authHeader.split(' ')[1]
    //console.log(token)

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if(err){
            //console.log('error verifying token');
            res.sendStatus(403);
        }
        else{
            //console.log(user.email)
            //console.log(user.isAdmin)
            res.json({access: true, email: user.email, admin: user.isAdmin});
        }
    });
});

module.exports = router;