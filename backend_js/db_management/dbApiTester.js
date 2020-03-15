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
// db.ReturnUsers().then((result) => {
//     test_user = {"email":result[0].email,"pword":result[0].password}
//     console.log(test_user)
// }).catch((err) => {
//     console.log(err)
// });

// var array = [
//   {"First_Name":"Antonio","Last_Name":"Washington","Password":"password","Email":"senortonito@gmail.com", "Location":{"Address":"712 Pawnee Ln", "Country":"United States", "State":"Illinois", "City":"Naperville", "Zipcode":60563}, "isadmin":true},
//   {"First_Name":"Testing","Last_Name":"Guy","Password":"password", "Email":"testing.guy@tmail.com", "Location":{"Address":"123 Example", "Country":"United States", "State":"Florida", "City":"Orlando", "Zipcode":32862}, "isadmin":false},
//   {"First_Name":"Babu","Last_Name":"Slapps","Password":"password", "Email":"babu.slapps@tmail.com", "Location":{"Address":"111 Illiois Rd", "Country":"United States", "State":"Illinois", "City":"Naperville", "Zipcode":60563}, "isadmin":false},
//   {"First_Name":"Gordon","Last_Name":"Ramstein","Password":"password", "Email":"gordon.gluten@tmail.com", "Location":{"Address":"001 Big Road Ln", "Country":"United States", "State":"Illinois", "City":"Naperville", "Zipcode":60560}, "isadmin":false},
// ];

// for (let index = 0; index < array.length; index++) {
//   const element = array[index];
//   db.NewUser(element.First_Name,element.Last_Name,element.Password,element.Email,element.Location,element.isadmin)
// }

array = [
  {"name":"Katrina","location":{"country":"USA","state":"Texas","city":"Dallas"},"keywords":{"type":["fire"],"items_need":["towels","food"]}},
  {"name":"Brookfield","location":{"country":"USA","state":"Illinois","city":"Chicago"},"keywords":{"type":["fire"],"items_need":["food"]}},
  {"name":"San Jose","location":{"country":"USA","state":"California","city":"San Jose"},"keywords":{"type":["earthquake"],"items_need":["construction"]}},
  {"name":"Jenny","location":{"country":"USA","state":"Iowa","city":"Iowa City"},"keywords":{"type":["tornado"],"items_need":["food"]}}
]

for (let index = 0; index < array.length; index++) {
  const element = array[index];
  db.AddDisaster(element.name,element.location,element.keywords)
}