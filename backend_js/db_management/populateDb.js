const { Pool, Client } = require('pg')
const bcrypt = require('bcrypt')
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'first_aid',
  password: 'password',
  port: 5432,
})



const array = [
    {"First_Name":"Antonio","Last_Name":"Washington","Password":"password","Email":"senortonito@gmail.com", "Location":{"Address":"712 Pawnee Ln", "Country":"United States", "State":"Illinois", "City":"Naperville", "Zipcode":60563}, "isadmin":true},
    {"First_Name":"Testing","Last_Name":"Guy","Password":"password", "Email":"testing.guy@tmail.com", "Location":{"Address":"123 Example", "Country":"United States", "State":"Florida", "City":"Orlando", "Zipcode":32862}, "isadmin":false},
    {"First_Name":"Babu","Last_Name":"Slapps","Password":"password", "Email":"babu.slapps@tmail.com", "Location":{"Address":"111 Illiois Rd", "Country":"United States", "State":"Illinois", "City":"Naperville", "Zipcode":60563}, "isadmin":false},
    {"First_Name":"Gordon","Last_Name":"Ramstein","Password":"password", "Email":"gordon.gluten@tmail.com", "Location":{"Address":"001 Big Road Ln", "Country":"United States", "State":"Illinois", "City":"Naperville", "Zipcode":60560}, "isadmin":false},
];
var query_str = `INSERT INTO Users (First_Name, Last_Name, Email, Password, Location, isadmin)
VALUES( '${array[0].First_Name}',
        '${array[0].Last_Name}',
        '${array[0].Email}',
        '${array[0].Password}',
        '${JSON.stringify(array[0].Location)}',
        '${array[0].isadmin}');`;

console.log(query_str);
pool
    .query(query_str)
    .then(res => {
        pool.query("SELECT * FROM USERS;")
            .then(res_2 => console.log(res_2.rows))
    })
    .catch(e => {
        console.error(e.detail)
        pool.query("SELECT * FROM USERS;")
            .then(res_2 => console.log(res_2.rows))
    })

for (let index = 0; index < array.length; index++) {
    const element = array[index];
    // query_str = `INSERT INTO "Users" ("First_Name", "Last_Name", "Email", "Password", "Location", "isadmin")VALUES('${element.First_Name}',
    //                     '${element.Last_Name}',
    //                     '${element.Email}',
    //                     '${element.Password}',
    //                     '${element.Location}',
    //                     '${element.isadmin}');`;
    // pool
    //     .query(query_str)
    //     .then(res => console.log("Pushed Data!", res))
    //     .catch(e => console.log(e))
    element.password = bcrypt.hash(element.password,10)
    var query_str = `INSERT INTO Users (First_Name, Last_Name, Email, Password, Location, isadmin)
    VALUES( '${element.First_Name}',
            '${element.Last_Name}',
            '${element.Email}',
            '${element.Password}',
            '${JSON.stringify(element.Location)}',
            '${element.isadmin}');`;
    
    console.log(query_str);
    pool
        .query(query_str)
        .then(res => {
            pool.query("SELECT * FROM USERS;")
                .then(res_2 => console.log(res_2.rows))
        })
        .catch(e => {
            console.error(e.detail)
            pool.query("SELECT * FROM USERS;")
                .then(res_2 => console.log(res_2.rows))
        })
}
