const express = require('express');
const MongoClient = require('mongodb').MongoClient
const bodyParser= require('body-parser')
const app = express();
const passport = require("passport");
const users = require("./routes/api/users");

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());
// DB Config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

  // Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes


const port = process.env.PORT || 5000; // process.env.port is Heroku's port if you choose to deploy the app there
app.listen(port, () => console.log(`Server up and running on port ${port} !`));

//MongoClient.connect('mongodb+srv://HOPEworksAdmin:HOPEworks1337@hopeworks-data-asjmw.mongodb.net/test?retryWrites=true&w=majority', (err, client) => {
//  if (err) return console.log(err)
//  db = client.db('hopeworks-data')
//    console.log('listening on 5000')
//  })

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