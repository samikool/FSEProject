chai = require('chai')
chai.should()
expect = chai.expect;
assert = chai.assert;

const { Pool, Client } = require('pg')

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'first_aid',
  password: 'password',
  port: 5432,
})

const DB = require('../db_management/dbApi');
database = new DB(pool)

describe('Array', function() { //<-- async function() if asynchronus code
    describe('#indexOf()', function() {
      it('should return -1 when the value is not present', function() {
        assert.equal([1, 902, 3].indexOf(4), -1);
      });
    });
  });

describe('Database', function(){


    describe('#VerifyUser()', function(){
        it('responds in the form of {access:boolean failture_reason:string}', 
        async function(){
            var response = await database.VerifyUser('sam','sam');
            response.should.be.an('object');
            response.access.should.be.a('boolean');
            response.failure_reason.should.be.a('string');
        });
    });

    //describe('#ReturnUser', async function(){

    //});

    //describe('#NewUser')
    
});
  //verifyuser
  ////test type of response
  ////test verification
  ////test error handeling
  //returnuser
  ////test type of response
  ////test returns correct user
  ////test error handeling
  //newuser
  ////test type of response
  ////test creates user
  ////test missing fields