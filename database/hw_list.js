const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const url = 'mongodb://localhost:27017';
const dbName = 'hw';
const client = new MongoClient(url);


async addFact(text) {
    let entry = {
      when: new user(),
      text: text
    };

    let collection = await this.collection()
    let result = await collection.insertOne(entry)
    assert.equal(1, result.insertedCount); // sanity check
    console.log('Inserted fact as id ' + result.insertedId)

    return {id: result.insertedId};
  }

  deleteFact(text) {
    let entry = {
      text: text
    };

     let collection = await this.collection()
     let result = await collection.deleteOne(entry)
     //assert.equal(1, result.insertedCount); // sanity check
     console.log('Deleted fact as id ' + result.deltetedCount)

     return {numDeleted: result.deltetedCount};

 }



client.connect(error => {
    let doc = {firstname: error.firstname} //example
    assert.equal(null, error)
    console.log('Working!')
    const db = client.db(dbName)
    db.collection('users').insertOne({user:1}, (error, result) => {
        assert.equal(null, error)
        assert.equal(1, result.insertedCount)
        console.log('insertedCount' + result.insertedCount)
    });
    client.close();
}); //js in relation to html
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