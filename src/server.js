const express = require('express');
const bodyParser= require('body-parser')
const app = express();

app.use(bodyParser.urlencoded({extended: true}))

app.listen(5000, function() {
  console.log('listening on 5000')
})
app.get('/', (req, res) => {
res.sendFile('/Users/chris/code/HOPEworks/public/'+ 'index.html')
})
app.post('/form', (req, res) => {
  console.log(req.body)
})