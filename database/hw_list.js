const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';
const moment = require('moment');
const ObjectId = require('mongodb').ObjectId;

module.exports = class DataStore {
  constructor(dbUrl) {
    this.dbUrl = dbUrl;                      //FactStore class which references "hw" database from (currently) local drive
    this.dbClient = null;
    this.dbName = 'hw';
  }

  async client() {
    if (this.dbClient && this.dbClient.isConnected()) {
      return this.dbClient;
    } else {
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
  }

  printEntry(fact, currentDay) {
  }

  async addForm(data) {
    let entry = {
      when: new Date(),                        //adding a form ('addForm') in text
      data: data
    };

    let collection = await this.collection()
    let result = await collection.insertOne(entry)                           //"sanity check" which is unused at the moment
    assert.equal(1, result.insertedCount); // sanity check
    console.log('Inserted fact as id ' + result.insertedId)

    return {id: result.insertedId};
  }

  async deleteForm(id) {
    let collection = await this.collection()
    const objectId = new ObjectId(id)
    let query = {_id: objectId}
    collection.remove(query)
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
