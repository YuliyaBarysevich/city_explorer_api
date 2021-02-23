'use strict';

// Packages
const express = require('express');
const cors = require('cors');
require('dotenv').config();

//express() will return server object
const app = express(); 
// enables local processes
app.use(cors());

const PORT = process.env.PORT || 3009;

// Routes

//Location
app.get('/location', locationCallback)
function locationCallback(req, res){
  const dataFromFile = require('./data/location.json');
  const output = new Location(dataFromFile, req.query.city);
  res.send(output);
}

function Location(dataFromFile, city){
  this.search_query = city;
  this.formatted_query = dataFromFile[0].display_name;
  this.latitude = dataFromFile[0].lat;
  this.longitude = dataFromFile[0].lon;
}

//Weather

// Initialization //

app.listen(PORT, () => console.log(`app is up on port http://localhost:${PORT}`))