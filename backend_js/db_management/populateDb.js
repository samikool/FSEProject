const { Pool, Client } = require('pg');

const pool = new Pool({
  user: 'josetorres',
  host: 'localhost',
  database: 'first_aid',
  password: 'password',
  port: 5432,
});

const dbApi = require('./dbApi');
const db = new dbApi(pool);
let test_user;


/**
 * Test & Initialization function to fill the Disaster Table
 * @param {*} array
 */
async function FillDisasters(array){
  for (let index = 0; index < array.length; index++) {
    const element = array[index];

    await db.AddDisaster(element.name,element.location,element.keywords)
  }
}

/**
 * Test & Initialization function to fill the Items Table
 * @param {*} array
 */
async function FillItems(array){
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    await db.AddItem(element.name,element.type,element.keywords)
  }
}

/**
 * Test & Initialization function to fill the Users Table
 * @param {*} array
 */
async function FillUsers(array){
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    await db.NewUser(element.first_name,
      element.last_name,
      element.password,
      element.email,
      element.location,
      element.isadmin,
      element.isDonor,
      element.isRequester
    )
  }
}

/**
 * Test & Initialization function to fill Requests Table
 * @param {*} array
 */
async function FillRequests(array){
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    await db.ManualRequest(element.requester_id,
      element.item_id,
      element.disaster_id,
      element.num_needed
    )
  }
}

/**
 * Needed async go function so we could wait for previous inserts to be done before new ones started
 * It was going too fast and violating foreign key restraints.
 */
go();

async function go(){
  await db.InitializeDB();

  const user_array = [
    {
      "first_name": "Antonio",
      "last_name": "Washington",
      "password": "password",
      "email": "senortonito@gmail.com",
      "location": {
        "Address": "712 Pawnee Ln",
        "Country": "United States",
        "State": "Illinois",
        "City": "Naperville",
        "Zipcode": 60563
      },
      "isadmin": true,
      "isDonor": true,
      "isRequester":true
    },
    {
      "first_name": "Testing",
      "last_name": "Guy",
      "password": "password",
      "email": "testing.guy@tmail.com",
      "location": {
        "Address": "123 Example",
        "Country": "United States",
        "State": "Florida",
        "City": "Orlando",
        "Zipcode": 32862
      },
      "isadmin": false,
      "isDonor": true,
      "isRequester": true
    },
    {
      "first_name": "Babu",
      "last_name": "Slapps",
      "password": "password",
      "email": "babu.slapps@tmail.com",
      "location": {
        "Address": "111 Illinois Rd",
        "Country": "United States",
        "State": "Illinois",
        "City": "Naperville",
        "Zipcode": 60563
      },
      "isadmin": false,
      "isDonor": true,
      "isRequester":true
    },
    {
      "first_name": "Gordon",
      "last_name": "Ramstein",
      "password": "password",
      "email": "gordon.gluten@tmail.com",
      "location": {
        "Address": "001 Big Road Ln",
        "Country": "United States",
        "State": "Illinois",
        "City": "Naperville",
        "Zipcode": 60560
      },
      "isadmin": false,
      "isDonor": true,
      "isRequester": true
    },
  ];
  await FillUsers(user_array);

  const dis_array = [
    {
      "name": "Katrina",
      "location": {
        "country": "USA",
        "state": "Texas",
        "city": "Dallas"
      },
      "keywords": {
        "type": ["Fire"],
        "items_need": ["towels","food", "soap"]
      } },
    {
      "name": "Brookfield",
      "location": {
        "country": "USA",
        "state": "Illinois",
        "city": "Chicago"
      },
      "keywords": {
        "type": ["Fire"],
        "items_need": ["food","material","generator"]
      } },
    {
      "name": "San Jose",
      "location": {
        "country": "USA",
        "state": "California",
        "city": "San Jose"
      },
      "keywords": {
        "type": ["Earthquake"],
        "items_need": ["construction","medical"]
      } },
    {
      "name": "Jenny",
      "location": {
        "country": "USA",
        "state": "Iowa",
        "city": "Iowa City"
      },
      "keywords": {
        "type": ["Tornado"],
        "items_need":["food","cleaning"]
      }
    }
  ];

  await FillDisasters(dis_array);

  const item_array = [
    {
      "name": "paper towels",
      "type": "cleaning",
      "keywords": ["large","paper"]
    },
    {
      "name": "soap",
      "type": "cleaning",
      "keywords": ["small","bar"]
    },
    {
      "name": "hand sanitizer",
      "type": "cleaning",
      "keywords": ["bacterial","travel"]
    },
    {
      "name": "canned soup",
      "type": "food",
      "keywords": ["soup","vegetable"]
    },
    {
      "name": "vegetables",
      "type": "food",
      "keywords": ["carrot","broccoli"]
    },
    {
      "name": "wood",
      "type": "material",
      "keywords": ["wood","planks","construction","building"]
    },
    {
      "name": "sheet metal",
      "type": "material",
      "keywords": ["metal", "construction", "building"]
    },

    {
      "name": "generator",
      "type": "equipment",
      "keywords": ["power","generator","electricity"]
    },
    {
      "name": "work light",
      "type": "equipment",
      "keywords": ["light","electricity","building"]
    },
    {
      "name": "towel",
      "type": "supplies",
      "keywords": ["dry", "wet", "towel"]
    },
    {
      "name": "blanket",
      "type": "supplies",
      "keywords": ["blanket","warm","soft","comfort"]
    },
    {
      "name": "food",
      "type": "food",
      "keywords": ["food", "hungry"]
    },
    {
      "name": "nails",
      "type": "material",
      "keywords": ["metal", "construction", "building","hammer"]
    },
    {
      "name": "gauze",
      "type": "medical",
      "keywords": ["hurt", "bleed", "bandage","medical"]
    },
    {
      "name": "hydrogen peroxide",
      "type": "medical",
      "keywords": ["bleeding", "medical", "clean"]
    },
    {
      "name": "stethoscope",
      "type": "medical",
      "keywords": ["heart", "doctor", "medical"]
    },
  ];

  await FillItems(item_array);

  const request_array = [
    //Disaster 1 Start
    {
      "requester_id": 1,
      "disaster_id": 1,
      "item_id": 2,
      "num_needed": 500,
    },
    {
      "requester_id": 1,
      "disaster_id": 1,
      "item_id": 10,
      "num_needed": 250,
    },
    {
      "requester_id": 1,
      "disaster_id": 1,
      "item_id": 12,
      "num_needed": 300,
    },
    //repeat requests to test merging num_needed and table sizing
    {
      "requester_id": 2,
      "disaster_id": 1,
      "item_id": 12,
      "num_needed": 500,
    },
    {
      "requester_id": 2,
      "disaster_id": 1,
      "item_id": 1,
      "num_needed": 500,
    },
    {
      "requester_id": 2,
      "disaster_id": 1,
      "item_id": 3,
      "num_needed": 500,
    },
    {
      "requester_id": 2,
      "disaster_id": 1,
      "item_id": 4,
      "num_needed": 500,
    },
    {
      "requester_id": 2,
      "disaster_id": 1,
      "item_id": 5,
      "num_needed": 500,
    },
    {
      "requester_id": 2,
      "disaster_id": 1,
      "item_id": 6,
      "num_needed": 500,
    },
    {
      "requester_id": 2,
      "disaster_id": 1,
      "item_id": 7,
      "num_needed": 500,
    },
    {
      "requester_id": 2,
      "disaster_id": 1,
      "item_id": 8,
      "num_needed": 500,
    },
    {
      "requester_id": 2,
      "disaster_id": 1,
      "item_id": 9,
      "num_needed": 500,
    },
    {
      "requester_id": 2,
      "disaster_id": 1,
      "item_id": 11,
      "num_needed": 500,
    },
    {
      "requester_id": 2,
      "disaster_id": 1,
      "item_id": 13,
      "num_needed": 500,
    },
    {
      "requester_id": 2,
      "disaster_id": 1,
      "item_id": 14,
      "num_needed": 500,
    },
    {
      "requester_id": 2,
      "disaster_id": 1,
      "item_id": 15,
      "num_needed": 500,
    },
    {
      "requester_id": 2,
      "disaster_id": 1,
      "item_id": 16,
      "num_needed": 500,
    },
    //Disaster 2 Start
    {
      "requester_id": 2,
      "disaster_id": 2,
      "item_id": 6,
      "num_needed": 1000,
    },
    {
      "requester_id": 2,
      "disaster_id": 2,
      "item_id": 8,
      "num_needed": 20,
    },
    //Disaster 3 Start
    {
      "requester_id": 3,
      "disaster_id": 3,
      "item_id": 15,
      "num_needed": 50,
    },
    {
      "requester_id": 3,
      "disaster_id": 3,
      "item_id": 13,
      "num_needed": 1000 ,
    },
    {
      "requester_id": 3,
      "disaster_id": 3,
      "item_id": 7,
      "num_needed": 500,
    },
    //Disaster 4 Start
    {
      "requester_id": 4,
      "disaster_id": 4,
      "item_id": 12,
      "num_needed": 300,
    },
    {
      "requester_id": 4,
      "disaster_id": 4,
      "item_id": 1,
      "num_needed": 100,
    },
    {
      "requester_id": 4,
      "disaster_id": 4,
      "item_id": 3,
      "num_needed": 200,
    }
  ];

  await FillRequests(request_array);
}


