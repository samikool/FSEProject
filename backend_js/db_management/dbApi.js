const bcrypt = require('bcrypt') 
const { Pool, Client } = require('pg')
class dbApi{
  constructor(pool){
    this.pool = pool;
  }

  /**
   * Return contents of user table
   * returns {JSON} This will
  */
  async ReturnUsers(){
    let res;
    const query_str = 'SELECT * FROM USERS'
    try{ 
      res = await this.pool.query(query_str)
      res = res.rows
    }
    catch(e){
      res = e
    }
    return res
  }

  /**
   * Check if given email and password combination matches db archives
   * @param {string} email Search db for email user
   * @param {string} pword Match password (unencryption)
   * @param {string} key Encryption key to compare password
   * @returns {JSON} Return boolean if 
   */
  async VerifyUser(email,pword,key){
    var query_str = `SELECT PASSWORD FROM USERS where email='${email}'`;
    let golden_pw;
    let res;
    try{
      golden_pw = this.pool.query(query_str)
      if(pword==golden_pw){
        // console.log("Access Granted... In theory");
        res = {"access":true};
      }
      else{
        if(dump != null){
          // console.log("Error: Password does not match");
          res = {"access":false,"failure_reason":"password"};
        }
      }
    }
    catch(e){
      res = {"access":false, "failure_reason":"email"};
    }

    return res;
    // this.pool
    //   .query(query_str)
    //   .then(res => {
    //     var golden_pw = dump.rows[0].password;
    //     if(pword==golden_pw){
    //       // console.log("Access Granted... In theory");
    //       return {"access":true}
    //     }
    //     else{
    //       if(dump != null){
    //         // console.log("Error: Password does not match");
    //         return {"access":false,"failure_reason":"password"}
    //       }
    //     }
    //   }
    //   )
    //   .catch(e => {
    //     //console.error(e.stack);
    //     //no email found in db
    //     return {"access":false, "failure_reason": "email"}
    //   })
  }

  /** 
  * Registers new user in DB.
  *
  * @param {string} fname The first name of the user.
  * @param {string} lname The last name of the user.
  * @param {string} pword The unencrypted password of the user. Needs to be encrypted.
  * @param {string} email The email of the user
  * @param {JSON} location JSON representation of user's address. This may vary between countries. Example: 
  {
  "Address":"123 Example",
  "Country":"United States", 
  "State":"Florida", 
  "City":"Orlando", 
  "Zipcode":32862
  }
  * @param {Boolean} isAdmin This will be true if user is an admin (else false).
  */
  async NewUser( fname,lname,pword,email,location,isAdmin){
    var enc_pword = await bcrypt.hash(pword,10)
    var query_str = `INSERT INTO Users (First_Name, Last_Name, Email, Password, Location, isadmin)
    VALUES( '${fname}',
            '${lname}',
            '${email}',
            '${enc_pword}',
            '${JSON.stringify(location)}',
            '${isAdmin}');`;
    console.log(query_str);
    this.pool
        .query(query_str)
        .then(res => {
            this.pool.query("SELECT * FROM USERS;")
                .then(res_2 => console.log(res_2.rows))
        })
        .catch(e => {
            console.error(e.detail)
            this.pool.query("SELECT * FROM USERS;")
                .then(res_2 => console.log(res_2.rows))
        })
    }
    
    Disconnect(){
      this.pool.end()
    }
}
module.exports = dbApi;
