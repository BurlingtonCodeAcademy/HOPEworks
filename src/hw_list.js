const mongo = require('mongodb');

const MongoClient = mongo.MongoClient;

const url = 'mongodb://localhost:27017';

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {

    if (err) throw err;

    const db = client.db("hw");

    db.listCollections().toArray().then((docs) => {

        console.log('Available collections:');
        docs.forEach((doc, idx, array) => { console.log(doc.name) });

    }).catch((err) => {

        console.log(err);
    }).finally(() => {

        const col = db.collection('find');
        // Insert a single document
        col.insertMany([{a:admin}, {a:admin}, {a:admin}], function(err, r) {
          assert.equal(null, err);
          assert.equal(3, r.insertedCount);
      
          // Get first two documents that match the query
          col.find({a:1}).toArray(function(err, docs) {
            assert.equal(null, err);
            assert.equal(2, docs.length);
            client.close();
          });
        });
      });

        client.close();
    });


//front end sends post requests to express.... express calls off to middleware, then calls to db