const express = require('express');
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
const app = express();
const hopeworks = require('./database/hw_list')
const assert = require('assert');
//const bcrypt = require('bcrypt');
const url = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const store = new DataStore('mongodb+srv://HOPEworksAdmin:HOPEworks1337@hopeworks-data-asjmw.mongodb.net/test?retryWrites=true&w=majority');
const hw_class = new hopeworks(url);

MongoClient.connect('mongodb+srv://HOPEworksAdmin:HOPEworks1337@hopeworks-data-asjmw.mongodb.net/test?retryWrites=true&w=majority', (err, client) => {
  if (err) return console.log(err)
  let db = client.db('hw') // hw --> users
  console.log('connected to mongo')
})

app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs')

app.listen(5000, function () {           //listens to port 5000, proxy from 3000
  console.log('listening on 5000')
})

app.post('/home', findUser)      //posts user info to HOME, which will change when finished

async function findUser(req, res) {
  console.log(req.body)
  let getUser = await hw_class.getUser(req.body.logemail.trim())    //calls 'getUser' from 'hw_list.js'
  //console.log(getUser)
  var userinfo = []
  getUser.forEach((entry) => {
    userinfo.push(entry)
  }, function (err) {
    assert.equal(null, err);
    console.log("Sending " + userinfo.length + " records to client");    //handshakes with mongodb 'hw/users' to confirm user/pw
    if (userinfo[0].authLevel === "admin") { res.redirect("/data") }        //if user has auth level of 'admin', redirect to '/data' (which doesn't exist at the moment, but in theory would hold all relevant data, i.e. forms and user info)       
    else if (userinfo[0].authLevel === "employee") { res.redirect("/forms") }  //if auth level 'employee', redirect to '/forms' (plural) to see all forms (again, not currently existent)
    else if (userinfo[0].authLevel === "volunteer") { res.redirect("/form") }  //if auth level 'volunteer', redirect to '/form' (singular) which would house just a single empty form
    else { res.redirect("/login") }  //anything else will kick you back to 'login' page
  })
  console.log(userinfo)
}

async function deleteForm (request, response) {
  let id = request.params.id
  let result = await store.deleteForm(id)
  console.log(result)
  response.redirect("/forms")
}

async function getAll(request, response) {
  let cursor = await store.all();
  let output = [];
  cursor.forEach((entry) => {
    output.push(entry);
  }, function (err) {
    assert.equal(null, err);
    console.log("Sending " + output.length + " records to client");
    response.type('application/json')
      .send(JSON.stringify(output))
  });
}

app.use(bodyParser.urlencoded({ extended: true }))

app.set('view engine', 'ejs')

app.listen(5000, function () {
  console.log('listening on 5000')
})

app.post('/form', express.json(), (req, res) => {
  addData(req, res)
})

async function addData(request, response) {
  let result = await store.addForm(request.body)
  let output = {
    status: 'ok',
    id: result.id
  }
  response
    .type('application/json')
    .send(JSON.stringify(output))
}

app.post('/login', (req, res) => {
  console.log(req.body)

//if (req.body.email &&
//  req.body.username &&
//  req.body.password &&
//  req.body.passwordConf) {

//  var userData = {
//    email: req.body.email,
//    username: req.body.username,
//    password: req.body.password,
//  }
//} else if (req.body.logemail && req.body.logpassword) {
//  User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
//    if (error || !user) {
//      var err = new Error('Wrong email or password.');
//      err.status = 401;
//      return res.redirect('/');
//    }
//    bcrypt.compare(password, user.password, function (err, result) {
//      if (result === true) {
//        return callback(null, user);
//      } else {
//        return callback();
//      }    
//    })
  });
}
})
