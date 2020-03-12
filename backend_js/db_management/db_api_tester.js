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
db.ReturnUsers().then((result) => {
    test_user = {"email":result[0].email,"pword":result[0].password}
    console.log(test_user)
}).catch((err) => {
    console.log(err)
});

db.NewUser("fake","boxer","password","fakeboxer@tmail.com",{"Address":"712 Pawnee Ln", "Country":"United States", "State":"Illinois", "City":"Naperville", "Zipcode":60563},false)
