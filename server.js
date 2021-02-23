'use strict';

// Packages
const express = require('express');
const cors = require('cors');
const superagent = require('superagent')
require('dotenv').config();

//express() will return server object
const app = express();
// enables local processes
app.use(cors());

const PORT = process.env.PORT || 3009;

// Routes

//Location
app.get('/location', locationCallback);
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
app.get('/weather', weatherCallback);
function weatherCallback(req, res){
  const dataFromFile2 = require('./data/weather.json');
  const output = dataFromFile2.data.map(day => 
  new Weather(day))
  res.send(output);
}

function Weather(object){
  {
    this.forecast = object.weather.description;
    this.time = object.valid_date;
  }
}
// Initialization //

app.listen(PORT, () => console.log(`app is up on port http://localhost:${PORT}`))