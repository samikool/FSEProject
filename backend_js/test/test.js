chai = require('chai');
chai.use(require('chai-json-equal'));
chai.use(require('chai-json-schema'));
chai.should();
expect = chai.expect;
assert = chai.assert;

const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'first_aid',
  password: 'password',
  port: 5432,
});

const DB = require('../db_management/dbApi');
database = new DB(pool);

describe('Database', function(){
    describe('#VerifyUser()', function(){
        it('responds in the form of {access:boolean failure_reason:string}',
        async function(){
          var response = await database.VerifyUser('sam','sam');
          response.should.be.an('object');
          response.access.should.be.a('boolean');
          response.failure_reason.should.be.a('string');
        });

        it('responds with {access:true isadmin:boolean} if correct password',
        async function(){
          var response = await database.VerifyUser('babu.slapps@tmail.com', 'password');
          console.log(response);
          response.access.should.equal(true);
          response.isAdmin.should.be.a('boolean');
          response.isAdmin.should.equal(false);
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
            element.token.should.be.a('string');
          });
        });
    });

    describe('#NewUser', function(){
      it('adds a user to the database',
      async function(){
        tempUser = {"first_name":"Guy","last_name":"fieri","password":"password", "email":"fiery.hair@tmail.com", "location":{"Address":"001 Small Road Ln", "Country":"United States", "State":"Oregan", "City":"Dallas", "Zipcode":43203}, "isadmin":false, "isdonor":true, "isrequester":true};
        await database.NewUser(tempUser.first_name,tempUser.last_name,tempUser.password,tempUser.email,tempUser.location,tempUser.isadmin, tempUser.isdonor, tempUser.isrequester );
        let user = await database.GetUser(tempUser.email);
        //need to delete values that can't match
        delete user.user_id;
        delete user.password;
        delete user.token;
        delete tempUser.password;

        tempUser.should.jsonEqual(user);
      })
      //returns what on success
      //returns what on email doesn't exist

      describe('#DropUser', function(){
        it('deletes a user from the database',
        async function(){
          tempUser = {"first_name":"Guy","last_name":"fieri","password":"password", "email":"fiery.hair@tmail.com", "location":{"Address":"001 Small Road Ln", "Country":"United States", "State":"Oregan", "City":"Dallas", "Zipcode":43203}, "isadmin":false};
          await database.DropUser(tempUser.email)
          let user = await database.GetUser(tempUser.email);

          expect(user, undefined);
        });
        //returns what if not found
        //returns successful if works?
      });
    });

    describe('#GetUser', function(){
      it('returns a user from the database given the user\'s email',
      async function() {
        let user = await database.GetUser('gordon.gluten@tmail.com');

        user.user_id.should.be.a('number');
        user.first_name.should.be.a('string');
        user.last_name.should.be.a('string');
        user.email.should.be.a('string');
        user.password.should.be.a('string');
        user.location.should.be.jsonSchema(locationScheme);
        user.isadmin.should.be.a('boolean');
        user.isdonor.should.be.a('boolean');
        user.isrequester.should.be.a('boolean');
        user.token.should.be.a('string');
      })
      //returns what if not found
    })
});
