var express = require('express');
var router = express.Router();
var verifyToken = require('../authorizer').verifyToken;

//get all the table data
router.get('/', async function (req, res) {
    const authHeader = await req.headers['authorization'];
    //console.log(authHeader);
    const token = authHeader && authHeader.split(' ')[1];
    //console.log(token)
    let response = await verifyToken(token);

    if(!response.access || !response.admin){
        res.sendStatus(403)
        console.log('Admin request for data denied')
        return;
    }

    let data = await database.GetAdminData();
    console.log('Admin reuqest for data accepted')
    Object.keys(data.users).forEach((key) => {
        data.users[key].password = "classified";
    })

    res.json(data)
});

//edit some table data
router.post('/', async function (req, res) {
    req = req.body
    //console.log(token)
    let response = await verifyToken(req.token);

    if(!response.access || !response.admin){
        res.sendStatus(403)
        console.log('Admin request for data denied')
        return;
    }

    console.log(req)
    if(req.type === 'users'){
        if(req.add){
            response = await database.NewUser(
                req.data.first_name,
                req.data.last_name,
                req.data.password,
                req.data.email,
                req.data.location,
                req.data.isadmin,
                req.data.isdonor,
                req.data.isrequester,
            )
            let user_id = await database.GetUser(req.data.email);
            user_id = user_id.user_id;
            response.user_id = user_id;
        }
        else{
            //keep it simple by just rewriting all the data
            response = await database.UpdateUser(
                req.data.user_id,
                req.data.first_name,
                req.data.last_name,
                req.data.email,
                req.data.location,
                req.data.isadmin,
                req.data.isdonor,
                req.data.isrequester,
            )
            //intending to password change
            if(req.password !== 'classified'){
                let pwResponse = await database.UpdateUserPassword(req.data.user_id, req.data.password);
                if(!pwResponse.success){
                    response.success = false;
                }
            }
        }
    }
    else if(req.type === 'items'){
        if(req.add){
            response = await database.AddItem(req.data.name, req.data.type, '');
            let item_id = await database.GetItemByName(req.data.name);
            item_id = item_id.item_id;
            response.item_id = item_id;
        }
        else{
            response = await database.UpdateItem(req.data.item_id,req.data.name, req.data.type);
        }
    }
    else if(req.type === 'disasters'){
        if(req.add){
            response = await database.AddDisaster(req.data.name, req.data.location, '')
            let disaster_id = await database.GetDisasterByName(req.data.name);
            disaster_id = disaster_id.disaster_id;
            response.disaster_id = disaster_id;
        }else{
            response = await database.UpdateDisaster(req.data.disaster_id, req.data.name, req.data.location)
        }
    }
    else if(req.type === 'requests'){
        if(req.add){
            response = await database.ManualRequest(
                req.data.requester_id, 
                req.data.item_id, 
                req.data.disaster_id, 
                req.data.num_needed
            )
        }else{
            response = await database.UpdateRequest(
                req.data.request_id,
                req.data.requester_id, 
                req.data.item_id, 
                req.data.disaster_id, 
                req.data.num_needed,
                req.data.num_provided,
            )
        }
    }
    else if(req.type === 'donations'){
        if(req.add){
            response = await database.ManualDonation(
                req.data.request_id,
                req.data.donor_id,
                req.data.disaster_id,
                req.data.item_id,
                req.data.quantity,
            )
        }else{
            response = await database.UpdateDonation(
                req.data.donation_id,
                req.data.request_id,
                req.data.donor_id,
                req.data.disaster_id,
                req.data.item_id,
                req.data.quantity,
            )
        }
    }
    console.log(response)
    res.json(response)
})

//remove some table data
router.delete('/', async function (req, res) {
    req = await req.body

    //console.log(token)
    let response = await verifyToken(req.token);

    if(!response.access || !response.admin){
        res.sendStatus(403)
        console.log('Admin request for data denied')
        return;
    }

    console.log(req)

    if(req.type === 'users'){
        response = await database.DropUser(req.data.email)
    }
    else if(req.type === 'items'){
        response = await database.DropItem(req.data.item_id)
    }
    else if(req.type === 'disasters'){
        response = await database.DropDisaster(req.data.disaster_id)
    }
    else if(req.type === 'requests'){
        response = await database.DropRequest(req.data.request_id)
    }
    else if(req.type === 'donations'){
        response = await database.DropDonation(req.data.donation_id)
    }
    console.log(response)
    res.json(response)
})

module.exports = router;