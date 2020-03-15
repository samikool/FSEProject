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
 * 
 * @param {*} location 
 */
  async ReturnDisaster(location){
    var query_str = `SELECT * from disasters WHERE location='${JSON.stringify(location)}';`
    let res;
    try{ 
      res = await this.pool.query(query_str)
      res = res.rows
    }
    catch(e){
      res = e
    }
    return res[0]
  }
  /**
   * 
   * @param {*} name 
   * @param {*} type 
   * @param {*} keywords 
   */
  AddItem(name,type,keywords){
    var queryformat_keywords = keywords.length === 0 ? "" : "\"" + keywords.join("\",\"") + "\"";
    var query_str = `insert into items (name,type,keywords)
    VALUES(
        '${name}',
        '${type}',
        '[${queryformat_keywords}]')`
    // console.log(query_str)
    this.pool.query(query_str)
      .then(res=>console.log(res))
  }


/**
 * 
 * @param {string} name This is the name of the disaster. Field can be null
 * @param {JSON} location JSON representation of user's address. This may vary between countries. Example: 
  {
  "Address":"123 Example",
  "Country":"United States", 
  "State":"Florida", 
  "City":"Orlando", 
  "Zipcode":32862
  }
 * @param {JSON} keywords JSON representation of keywords of items needed
 * {
 *  "type":["fire","hurricane"],
 *  "items_needed":["towels","food","cleaning"]
 * }
 */
  async AddDisaster(name,location,keywords){
    //check if disaster already has a disaster at the given location
    var query_str = `SELECT keywords FROM disasters where location='${JSON.stringify(location)}';`
    var exists = await this.pool
        .query(query_str)
        .then(res=>{
          //return false if no disaster at currently location
          // console.log(res.rows.isEmpty())
          if (res.rows.length < 1){
            return false
          }
          else{
            //get row w/ location
            const res_types = res.rows[0]['keywords'].type;
            const in_types = keywords.type;

            //values in keywords that are not in db
            let difference = in_types.filter(x => !res_types.includes(x));

            //create unique array
            const distinct = (value, index, self)=>{
              return self.indexOf(value) == index;
            }         
            
            const concat_types = res_types.concat(in_types);
            // console.log(concat_types);
            const unique_types = concat_types.filter(distinct);

            //check if keywords match the input keywords
            var queryformat_types = unique_types.length === 0 ? "" : "\"" + unique_types.join("\",\"") + "\"";
            query_str = `UPDATE disasters SET keywords=jsonb_set(keywords,'{type}','[${queryformat_types}]') WHERE location='${JSON.stringify(location)}';`
            // console.log(query_str);

            this.pool
                .query(query_str)

          }
        })

    if (exists == false){
      query_str = `INSERT INTO disasters (name,location,keywords)
      VALUES( '${name}',
              '${JSON.stringify(location)}',
              '${JSON.stringify(keywords)}');`;

      console.log(query_str);
      this.pool
          .query(query_str)
          .then(res => console.log(res))
          .catch(e => {
              console.error(e.detail)
              // this.pool.query("SELECT * FROM USERS;")
              //     .then(res_2 => console.log(res_2.rows))
          })
    } 
  }

  /**
   * Check if given email and password combination matches db archives
   * @param {string} email Search db for email user
   * @param {string} pword Match password (unencryption)
   * @param {string} key Encryption key to compare password
   * @returns {JSON} Return boolean if 
   */
  async VerifyUser(email,pword){
    var query_str = `SELECT PASSWORD FROM USERS where email='${email}'`;
    let golden_pw_enc;
    let res = {access:false};
    try{
      golden_pw_enc = await this.pool.query(query_str)
      golden_pw_enc = golden_pw_enc.rows[0].password
      //console.log(golden_pw_enc)
      if(bcrypt.compareSync(pword,golden_pw_enc)){
        // console.log("Access Granted... In theory");
        res = {"access":true};
      }
      else{
          // console.log("Error: Password does not match");
          res = {"access":false,"failure_reason":"password"};
        
      }
    }
    catch(e){
    //   console.log(e)
      res = {"access":false, "failure_reason":"email"};
    }

    return res;
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
    var enc_pword = await bcrypt.hash(pword,10);
    var query_str = `INSERT INTO Users (First_Name, Last_Name, Email, Password, Location, isadmin)
    VALUES( '${fname}',
            '${lname}',
            '${email}',
            '${enc_pword}',
            '${JSON.stringify(location)}',
            '${isAdmin}');`;
    //console.log(query_str);
    this.pool
        .query(query_str)
        .then(res => {
            // this.pool.query("SELECT * FROM USERS;")
            //     .then(res_2 => console.log(res_2.rows))
        })
        .catch(e => {
            console.error(e.detail)
            this.pool.query("SELECT * FROM USERS;")
                // .then(res_2 => console.log(res_2.rows))
        })
    }

    /**
     * Gets a user with the given email
     * @param {string} email email of the requested user
     * @returns {object} with properties of user
     */
    async GetUser(email){
      var query_str = `SELECT * FROM USERS WHERE EMAIL = '${email}'`
      let res = await this.pool.query(query_str);
      return res.rows[0];
    }

    /**
     * Drops a user from the table with the given email
     * @param {string} email email of the user to be dropped
     */
    async DropUser(email){
      var query_str = `DELETE FROM USERS WHERE EMAIL = '${email}'`
      let res = await this.pool.query(query_str);
    }
    
    Disconnect(){
      this.pool.end()
    }
}
module.exports = dbApi;
