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
const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY

// Routes

//Location
app.get('/location', locationCallback);
function locationCallback(req, res){
  // const dataFromFile = require('./data/location.json');
  const city = req.query.city;
  const url = `https://us1.locationiq.com/v1/search.php?key=${GEOCODE_API_KEY}&q=${city}&format=json`;

  superagent.get(url)
    .then(data => {
      const locationObject = data.body[0];
      const output = new Location(locationObject, req.query.city);
      res.send(output);
    })
    .catch(error =>{
      console.log(error);
      res.status(500).send(`Sorry something went wrong`);
    }); 
}

function Location(locationObject, city){
  this.search_query = city;
  this.formatted_query = locationObject.display_name;
  this.latitude = locationObject.lat;
  this.longitude = locationObject.lon;
}

//Weather
app.get('/weather', weatherCallback);
function weatherCallback(req, res){
  // const dataFromFile2 = require('./data/weather.json');
  const city = req.query.search_query;
  const url = `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&key=${WEATHER_API_KEY}`;
  superagent.get(url)
    .then(weatherData => {
      // const weatherObject = weatherData.body.data;
      const output =  weatherData.body.data.map(day => new Weather(day));
      res.send(output);
    });
}

function Weather(object){
  this.forecast = object.weather.description;
  this.time = object.valid_date;
}
// Initialization //

app.listen(PORT, () => console.log(`app is up on port http://localhost:${PORT}`))