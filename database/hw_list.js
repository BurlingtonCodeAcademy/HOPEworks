const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
//const url = 'mongodb://localhost:27017';
//const moment = require('moment');
//const client = new MongoClient(url);


class FactStore {
  constructor(dbUrl) {
    this.dbUrl = dbUrl;                      //FactStore class which references "hw" database from (currently) local drive
    this.dbClient = null;
    this.dbName = 'hw';
  }

  async client() {
    if (this.dbClient && this.dbClient.isConnected()) {
      return this.dbClient;
    } else {
      // http://mongodb.github.io/node-mongodb-native/3.1/api/MongoClient.html             //async function connecting to database
      console.log(`Connecting to ${this.dbUrl}...`)
      this.dbClient = await MongoClient.connect(this.dbUrl, { useNewUrlParser: true })
      console.log("Connected to database: " + this.dbName);
      return this.dbClient;
    }
  }



  async collection() {
    const client = await this.client();
    const db = client.db(this.dbName);
    const collection = db.collection('users');                    //references 'users' collection within local 'hw' database
    return collection;
  }

  async getUser(user) {
    const u = user
    const collection = await this.collection();                //'getUser' function which is currently being used by 'server.js'
    return collection.find({user: u}).sort([['when', 1]]);
  }

  async all() {
    let collection = await this.collection()
    return collection.find({}).sort([['when', 1]]);
  }

  async printAll() {
    let cursor = await this.all();

  //   let currentDay;
  //   await cursor.forEach((fact) => {
  //     let when = moment(fact.when);
  //     let startOfDay = when.format('YYYYMMDD');
  //     if (!currentDay || currentDay != startOfDay) {
  //       console.log(when.format('MMMM Do, YYYY'));
  //       currentDay = startOfDay;
  //     }
  //     let output = when.format('  hh:mm a - ') + fact.text;
  //     console.log(output);
  //     return currentDay;
  //   })
   }

  printEntry(fact, currentDay) {
  }

  async addForm(text) {
    let entry = {
      when: new Date(),                        //adding a form ('addForm') in text
      text: text
    };

    let collection = await this.collection()
    let result = await collection.insertOne(entry)                           //"sanity check" which is unused at the moment
    assert.equal(1, result.insertedCount); // sanity check
    console.log('Inserted fact as id ' + result.insertedId)

    return {id: result.insertedId};
  }

  async deleteFact(text) {
    let entry = {                     //"deleteFact" will in theory be renamed to something like "deleteUser"
      text: text
    };

     let collection = await this.collection()
     let result = await collection.deleteOne(entry)
     //assert.equal(1, result.insertedCount); // sanity check
     console.log('Deleted fact as id ' + result.deltetedCount)

     return {numDeleted: result.deltetedCount};
  
 }
}


// client.connect(error => {
//     let doc = {firstname: error.firstname} //example
//     assert.equal(null, error)
//     console.log('Working!')
//     const db = client.db(dbName)
//     db.collection('users').insertOne({user:1}, (error, result) => {
//         assert.equal(null, error)
//         assert.equal(1, result.insertedCount)
//         console.log('insertedCount' + result.insertedCount)
//     });
//     client.close();
// }); js in relation to html
// MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {

//     if (err) throw err;

//     const db = client.db("hw");

// db.createCollection('hw')

//     db.listCollections().toArray().then((docs) => {

//         console.log('Available collections:');
//         docs.forEach((doc, idx, array) => { console.log(doc.name) });

//     }).catch((err) => {

//         console.log(err);
//     }).finally(() => {
//     });


    //     const col = db.collection('find');
    //     // Insert a single document
    //     col.insertMany([{a:admin}, {a:admin}, {a:admin}], function(err, r) {
    //       assert.equal(null, err);
    //       assert.equal(3, r.insertedCount);

    //       // Get first two documents that match the query
    //       col.find({a:1}).toArray(function(err, docs) {
    //         assert.equal(null, err);
    //         assert.equal(2, docs.length);
    //         client.close();
    //       });
    //     });
    //   });

    //     client.close();
    // });


//front end sends post requests to express.... express calls off to middleware, then calls to db
// })

module.exports = FactStore