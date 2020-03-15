chai = require('chai');
chai.use(require('chai-json-equal'));
chai.use(require('chai-json-schema'));
chai.should();
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
        it('responds in the form of {access:boolean failure_reason:string}', 
        async function(){
          var response = await database.VerifyUser('sam','sam');
          response.should.be.an('object');
          response.access.should.be.a('boolean');
          response.failure_reason.should.be.a('string');
        });

        it('responds with {access:true} if correct password',
        async function(){
          var response = await database.VerifyUser('babu.slapps@tmail.com', 'password');
          response.access.should.equal(true);
        });
        
        it('responds with {access:false failure_reason:password} if wrong password',
        async function(){
          var response = await database.VerifyUser('babu.slapps@tmail.com', 'passwordddd');
          response.access.should.equal(false);
          response.failure_reason.should.equal('password');
        });

        it('responds with {{access:false failure_reason:email} if the email is unregistered',
        async function(){
          var response = await database.VerifyUser('not.a.real.email@aol.com', 'password')
          response.access.should.equal(false);
          response.failure_reason.should.equal('email');
        });
    });

    describe('#ReturnUsers', function(){
        it('responds in the form of an array of {user_id:int, first_name:string, last_name:string, email:string, password:string, location:JSON, isadmin:false, token:string}',
        async function(){
          var response = await database.ReturnUsers();
          response.should.be.an('array');

          locationScheme = {
            required: ['City', 'State','Address','Country','Zipcode'],
            properties:{
              City: {
                type: 'string'
              },
              State:{
                type: 'string'
              },
              Address: {
                type: 'string'

              },
              Country: {
                type: 'string'
              },
              Zipcode: {
                type: 'number'
              }
            }
          };

          response.forEach(element => {
            element.user_id.should.be.a('number');
            element.first_name.should.be.a('string');
            element.last_name.should.be.a('string');
            element.email.should.be.a('string');
            element.password.should.be.a('string');
            element.location.should.be.jsonSchema(locationScheme);
            element.isadmin.should.be.a('boolean');
            expect(element.token).to.be.null || expect(element.token).to.be.an('object')
          });
        });
    });

    //writing this test won't work until we can return a single user
    describe('#NewUser', function(){
      it('adds a user to the database', async function(){
        newUser = {"first_name":"Guy","last_name":"Fieri","password":"password", "email":"fiery.hair@tmail.com", "location":{"Address":"001 Small Road Ln", "Country":"United States", "State":"Oregan", "City":"Dallas", "Zipcode":43203}, "isadmin":false};
        await database.NewUser(newUser.First_Name,newUser.Last_Name,newUser.Password,newUser.Email,newUser.Location,newUser.isadmin);
        users = await database.ReturnUsers();
      })
    });
});
  //newuser
  ////test creates user