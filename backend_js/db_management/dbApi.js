const bcrypt = require('bcrypt') 
const { Pool, Client } = require('pg')
class dbApi{
  constructor(pool){
    this.pool = pool;
  }
  
/**
 * 
 * @param {*} requester 
 * @param {*} item 
 * @param {*} disaster 
 * @param {*} quantity 
 */
  async ManualRequest(requester_id, item_id, disaster_id, quantity){
    // insert request to req table
    var query_str = `INSERT INTO REQUESTS (requester_id, disaster_id, item_id, num_needed)
    VALUES(${requester_id},
      ${disaster_id},
      ${item_id},
      ${quantity});`

    let res;
    try{ 
      res = await this.pool.query(query_str)
    }
    catch(e){
      res = e
    }
    return res
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
      .then(res=>console.log(/*res*/"item insert"))
  }
/**
 * Here you can search for an item based on a pattern in the name
 * @param {*} pattern 
 */
  async SearchItemContains(pattern){
    let res;
    const query_str = `SELECT * FROM items WHERE NAME like '%${pattern}%'`;
    try{
      res = await this.pool.query(query_str);
      res = res.rows;
    }
    catch(e){
      res = false;
    }
    return res;
  }
  
/**
 * Here you can search for an item based on a pattern in the name
 * @param {*} pattern 
 */
async SearchItemStartsWith(pattern){
  let res;
  const query_str = `SELECT * FROM items WHERE NAME like '${pattern}%'`;
  try{
    res = await this.pool.query(query_str);
    res = res.rows;
  }
  catch(e){
    res = false;
  }
  return res;
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

      // console.log(query_str);
      this.pool
          .query(query_str)
          .then(res => console.log("disaster insert"))
          .catch(e => {
              console.error(e.detail)
              // this.pool.query("SELECT * FROM USERS;")
              //     .then(res_2 => console.log(res_2.rows))
          })
    } 
  }

  /**
   * Gets all disasters from the table
   */
  async getAllDisasters(){
    var query_str = `SELECT * FROM DISASTERS;`
    let disasters = await this.pool.query(query_str);
    
    return disasters.rows;
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
        query_str = `SELECT isadmin FROM USERS where email='${email}'`
        let isAdmin = await this.pool.query(query_str)
        isAdmin =  isAdmin.rows[0].isadmin
        // console.log('isAdmin DB: ' + isAdmin)
        res = {"access":true, "isAdmin":isAdmin};
      }
      else{
          // console.log("Error: Password does not match");
          res = {"access":false,"failure_reason":"password"};
        
      }
    }
    catch(e){
      //aconsole.log(e)
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
  async NewUser( fname,lname,pword,email,location,isAdmin,isDon,isReq){
    var enc_pword = await bcrypt.hash(pword,10);
    let user_id;
    let res;
    var query_str = `INSERT INTO Users (First_Name, Last_Name, Email, Password, Location, isadmin,isDonor,isRequester)
    VALUES( '${fname}',
            '${lname}',
            '${email}',
            '${enc_pword}',
            '${JSON.stringify(location)}',
            '${isAdmin}',
            '${isDon}',
            '${isReq}');`;
    // console.log(query_str);
    try{
      //attempt insert
      res = await this.pool.query(query_str);
      // console.log(`New User: Original Result ${JSON.stringify(res)}`);

      //successful insert of new user
      query_str = `SELECT user_id FROM USERS WHERE EMAIL = '${email}';`
      res = await this.pool.query(query_str);
      user_id = res.rows[0].user_id
      console.log(user_id);
      if(isReq){
          query_str = `INSERT INTO REQUESTERS(user_id) VALUES(${user_id});`
          await this.pool.query(query_str);
      }

      if(isDon){
          query_str = `INSERT INTO DONORS(user_id) VALUES(${user_id});`
          await this.pool.query(query_str);
      }
    }
    catch(e){
      console.error(e);
    }


    // this.pool
    //     .query(query_str)
    //     .then(res => {
    //       console.log(`New User: Original Result ${res}`);
    //       //successful insert of new user
    //       user_id = await this.pool.query(`SELECT user_id FROM USERS WHERE EMAIL='${email};'`);
    //       console.log(`-----------\nNew User: User ID Result ${user_id}`);
    //       try{
    //         if(isReq){
    //           query_str = `INSERT INTO REQUESTERS(user_id) VALUES(${user_id});`
    //           this.pool.query(query_str);
    //         }

    //         if(isDon){
    //           query_str = `INSERT INTO DONORS(user_id) VALUES(${user_id});`
    //           this.pool.query(query_str);
    //         }
    //       }
    //       catch(e){
    //         console.error(e);
    //       }


    //     })
    //     .catch(e => {
    //         console.error(e.detail)
    //         this.pool.query("SELECT * FROM USERS;")
    //             // .then(res_2 => console.log(res_2.rows))
    //     })


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

    /**
     * Adds the token to the users entry by searching with the provoided email
     * @param {string} email email of the user to associate with token 
     * @param {string} token token to assosciate with the user 
     */
    async StoreToken(email, token){
      //console.log('Store: ' + email + ' ' + token)
      var query_str = `UPDATE USERS SET TOKEN = '${token}' WHERE EMAIL = '${email}'`
      let res = await this.pool.query(query_str);
    }

    /**
     * Finds the user by email and enesures the token stored matches the token provided
     * @param {string} email email of the user to validate with token
     * @param {string} token token to validate with user
     * @returns {boolean} true if token and user match false if not
     */
    async ValidateToken(email, token){
      //console.log('Validate: ' + email + ' ' + token)
      var query_str = `SELECT TOKEN FROM USERS WHERE EMAIL = '${email}'`
      let res = await this.pool.query(query_str);
      let retreivedToken = res.rows[0].token;
      //console.log('Validate ' + retreivedToken)
      if(token == retreivedToken){
        return true;
      }else{
        return false;
      }
    }

    /**
     * First validates the token is associated with the user then deletes it
     * @param {string} email of the user that is logging out and wanted the token deleted 
     * @param {string} token token that needs to be deleted
     * @returns {boolean} true if delete was successful false if not
     */
    async RemoveToken(email, token){
      var query_str = `UPDATE USERS SET TOKEN = '' WHERE EMAIL = '${email}'`
      if(this.ValidateToken(email, token)){
        let res = await this.pool.query(query_str);
        return true;
      }
      return false;
    }


    
    Disconnect(){
      this.pool.end()
    }
}
module.exports = dbApi;
