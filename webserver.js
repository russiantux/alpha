const express = require('express');
const cors = require('cors');
var path = require('path');

const app = express();

const port = 8080;


app.use(bodyParser.urlencoded({ extended: true }), cors());

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname + '/index.html'))
})

