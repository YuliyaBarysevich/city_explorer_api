'use strict';

// Packages
const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
const pg = require('pg');
require('dotenv').config();

//express() will return server object
const app = express();
// enables local processes
app.use(cors());

const PORT = process.env.PORT || 3009;
const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
const PARKS_API_KEY = process.env.PARKS_API_KEY;
const DATABASE_URL = process.env.DATABASE_URL;

// Routes
const client = new pg.Client(DATABASE_URL)
client.on('error', error => console.log(error))
//Location
app.get('/location', locationCallback);
function locationCallback(req, res){
  const sqlString = 'SELECT * FROM location_info WHERE search_query = $1';
  const sqlArray = [req.query.city]
  //check if something in database by city name
  client.query(sqlString, sqlArray)
  .then(dataFromDatabase =>{
      if (dataFromDatabase.rows.length > 0){
        console.log('result from data base')
        res.status(200).json(dataFromDatabase.rows[0]);
      }else {
        // if no, get info from API
        const city = req.query.city;
        const url = `https://us1.locationiq.com/v1/search.php?key=${GEOCODE_API_KEY}&q=${city}&format=json`;
        superagent.get(url)
          .then(data => {
            const locationObject = data.body[0];
            const output = new Location(locationObject, req.query.city);
            console.log('location object from API', output);
            // store new city in database
            const sqlInsert = 'INSERT INTO location_info (search_query, formatted_query, latitude, longitude) VALUES ($1, $2, $3, $4)';
            const valuesToSave = [output.search_query, output.formatted_query, output.latitude, output.longitude];
            
            res.send(output);
            client.query(sqlInsert, valuesToSave)
          })
          .catch(error =>{
            console.log(error);
            res.status(500).send(`Sorry something went wrong`);
          });

      }
    });
  // const dataFromFile = require('./data/location.json');
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
    })
    .catch(error =>{
      console.log(error);
      res.status(500).send(`Sorry something went wrong`);
    });
}

function Weather(object){
  this.forecast = object.weather.description;
  this.time = object.valid_date;
}

app.get('/parks', parksCallback)
function parksCallback(req, res){
  const url = `https://developer.nps.gov/api/v1/parks?limit=3&start=0&q=${req.query.search_query}&sort=&api_key=${PARKS_API_KEY}`
  superagent.get(url)
    .then(parkData => {
      const output = parkData.body.data.map(newPark => new Park(newPark))
      res.send(output)
    })
    .catch(error =>{
      console.log(error);
      res.status(500).send(`Sorry something went wrong`);
    });
}

function Park(object){
  this.name = object.fullName;
  this.address = object.addresses[0].line1 + ' ' + object.addresses[0].city + ' ' + object.addresses[0].stateCode + ' ' + object.addresses[0].postalCode;
  this.fee = object.entranceFees[0].cost;
  this.description = object.description;
  this.url = object.url;
}

// Initialization //

client.connect().then(() => {
  app.listen(PORT, () => console.log(`app is up on port http://localhost:${PORT}`))
})
