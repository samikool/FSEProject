const {Pool, Client} = require('pg')
const bcrypt = require('bcrypt');
class DB {
  pool;
  bcrypt;
  constructor(user, host, database, password, port){
    this.pool = new Pool({
      user: user,
      host: host,
      database: database,
      password: password,
      port: port,
    });
    this.bcrypt = bcrypt;
  }

  async login(email, password){
    var hashedPassword = await this.pool
      .query(`SELECT PASSWORD FROM USERS where email='${email}'`)
      .then( res => {
        console.log("result: " + res.rows[0].password);
        return res.rows[0].password;
      }).catch(err => {
        return -1;
      });

    if(hashedPassword === -1){
      return -1;
    }

    if(await bcrypt.compare(password, hashedPassword)){
      console.log("password same");
      return 1;
    } else{
      console.log("wrong password");
      return 0;
    }
  }

  async register(email, password){
  }
}

module.exports.DB = DB;
