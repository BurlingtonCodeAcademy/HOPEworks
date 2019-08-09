const express = require('express');
const MongoClient = require('mongodb').MongoClient
const bodyParser= require('body-parser')
const app = express();

var db 

MongoClient.connect('mongodb+srv://HOPEworksAdmin:HOPEworks1337@hopeworks-data-asjmw.mongodb.net/test?retryWrites=true&w=majority', (err, client) => {
  if (err) return console.log(err)
  db = client.db('hopeworks-data')
    console.log('listening on 5000')
  })

app.use(bodyParser.urlencoded({extended: true}))

app.set('view engine', 'ejs')

app.listen(5000, function() {
  console.log('listening on 5000')
})
app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, result) => {
    if (err) return console.log(err)
    res.send({quotes: result})
  })
})
app.post('/quotes', (req, res) => {
  console.log(req.body)
})