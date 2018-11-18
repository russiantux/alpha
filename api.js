const express = require('express');
const MongoClient = require('mongodb');
const bodyParser = require('body-parser');
const db = require('./config/db');
const cors = require('cors');
var path = require('path');

const app = express();

const port = 8081;


app.use(bodyParser.urlencoded({ extended: true }), cors());


MongoClient.connect(db.url, (err, database) => {
    if (err) return console.log(err)
    require('./app/routes')(app, database);
  
    app.listen(port, () => {
      console.log('API live on ' + port);
    });               
  })