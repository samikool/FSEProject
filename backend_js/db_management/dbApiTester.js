const { Pool, Client } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'first_aid',
  password: 'password',
  port: 5432,
})

const dbApi = require('./dbApi')
const db = new dbApi(pool)
let test_user;


/**
 * Test & Initialization function to fill the Disaster Table
 * @param {*} array 
 */
async function FillDisasters(array){
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    db.AddDisaster(element.name,element.location,element.keywords)
  }
}

/**
 * Test & Initialization function to fill the Items Table
 * @param {*} array 
 */
async function FillItems(array){
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    db.AddItem(element.name,element.type,element.keywords)  
  }
}

/**
 * Test & Initialization function to fill the Users Table
 * @param {*} array 
 */
async function FillUsers(array){
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    db.NewUser(element.first_name,element.last_name,element.password,element.email,element.location,element.isadmin,element.isDonor,element.isRequester)
  }
}

const user_array = [
  {"first_name":"Antonio","last_name":"Washington","password":"password","email":"senortonito@gmail.com", "location":{"Address":"712 Pawnee Ln", "Country":"United States", "State":"Illinois", "City":"Naperville", "Zipcode":60563}, "isadmin":true,"isDonor":true, "isRequester":true},
  {"first_name":"Testing","last_name":"Guy","password":"password", "email":"testing.guy@tmail.com", "location":{"Address":"123 Example", "Country":"United States", "State":"Florida", "City":"Orlando", "Zipcode":32862}, "isadmin":false,"isDonor":true, "isRequester":true},
  {"first_name":"Babu","last_name":"Slapps","password":"password", "email":"babu.slapps@tmail.com", "location":{"Address":"111 Illiois Rd", "Country":"United States", "State":"Illinois", "City":"Naperville", "Zipcode":60563}, "isadmin":false,"isDonor":true, "isRequester":true},
  {"first_name":"Gordon","last_name":"Ramstein","password":"password", "email":"gordon.gluten@tmail.com", "location":{"Address":"001 Big Road Ln", "Country":"United States", "State":"Illinois", "City":"Naperville", "Zipcode":60560}, "isadmin":false,"isDonor":true, "isRequester":true},
];
// FillUsers(user_array);

const dis_array = [
  {"name":"Katrina","location":{"country":"USA","state":"Texas","city":"Dallas"},"keywords":{"type":["fire"],"items_need":["towels","food"]}},
  {"name":"Brookfield","location":{"country":"USA","state":"Illinois","city":"Chicago"},"keywords":{"type":["fire"],"items_need":["food"]}},
  {"name":"San Jose","location":{"country":"USA","state":"California","city":"San Jose"},"keywords":{"type":["earthquake"],"items_need":["construction"]}},
  {"name":"Jenny","location":{"country":"USA","state":"Iowa","city":"Iowa City"},"keywords":{"type":["tornado"],"items_need":["food"]}}
]
// FillDisasters(dis_array);

const item_array = [
  {"name":"paper towels","type":"cleaning","keywords":["large","paper"]},
  {"name":"soap","type":"cleaning","keywords":["small","bar"]},
  {"name":"hand sanitizer","type":"cleaning","keywords":["bacterial","travel"]},
  {"name":"canned soup","type":"food","keywords":["soup","vegetable"]},
  {"name":"vegetables","type":"food","keywords":["carrot","broccoli"]}
]
// FillItems(item_array);

db.SearchItemContains("er").then(res=>{console.log(res)})

const return_location = {"country":"USA","state":"Illinois","city":"Chicago"};
db.ReturnDisaster(return_location)
  .then(res=>{
    console.log(res)
  })
;