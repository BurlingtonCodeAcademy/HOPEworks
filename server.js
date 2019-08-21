const express = require('express');
const MongoClient = require('mongodb').MongoClient
const bodyParser = require('body-parser')
const app = express();
const DataStore = require('./database/hw_list')
const assert = require('assert');
const passport = require('passport')
const profileStore = new DataStore ("localhost:27017/Profile-Store"); // rewrite later
//const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const store = new DataStore('mongodb+srv://HOPEworksAdmin:HOPEworks1337@hopeworks-data-asjmw.mongodb.net/test?retryWrites=true&w=majority');

//------------GOOGLE STRATEGY-----------//

var GoogleStrategy = require('passport-google-oauth20').Strategy;

passport.use(new GoogleStrategy({ // from 
    clientID: "hope-works",
    clientSecret: "",
    callbackURL: "/return"
  },
  function(accessToken, refreshToken, profile, cb) {
    profileStore.findUser({ googleId: profile.id }, function (err, user) {
      return cb(err, user);
    });
  }
));



app.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

app.get('/auth/google/callback', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {    
    // Successful authentication, redirect home.
    res.redirect('/');
  });
  // keeps user login info active so they can travel page to page without relogin
passport.serializeUser(function(user, cb) {
      cb(null, user);
});
//token is removed when they logout
passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});
// Use application-level middleware for common functionality, including
// logging, parsing, and session handling.
app.use(require('morgan')('combined'));
app.use(require('cookie-parser')());
app.use(require('body-parser').urlencoded({ extended: true }));
app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));


// Define routes. Authentication & login
app.get('/',
  function(req, res) {
    res.render('home', { user: req.user });
  });

app.get('/login',
  function(req, res){
    res.render('login');
  });

app.get('/login/google',
  passport.authenticate('google'));

app.get('/return', 
  passport.authenticate('google', { failureRedirect: '/login' }),
  function(req, res) {
    res.redirect('/');
  });

app.get('/profile',
  require('connect-ensure-login').ensureLoggedIn(),
  function(req, res){
    res.render('profile', { user: req.user });
  });

 //--------END GOOOGLE STRATEGY--------// 

MongoClient.connect('mongodb+srv://HOPEworksAdmin:HOPEworks1337@hopeworks-data-asjmw.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true }, (err, client) => {
  if (err) return console.log(err)
  let db = client.db('hw') // hw --> users
  console.log('connected to mongo')
})

app.get('/forms', getAll);

app.get('/delete/:id', deleteForm)

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

if (req.body.email &&
  req.body.username &&
  req.body.password &&
  req.body.passwordConf) {

  var userData = {
    email: req.body.email,
    username: req.body.username,
    password: req.body.password,
  }
} else if (req.body.logemail && req.body.logpassword) {
  User.authenticate(req.body.logemail, req.body.logpassword, function (error, user) {
    if (error || !user) {
      var err = new Error('Wrong email or password.');
      err.status = 401;
      return res.redirect('/');
    }
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