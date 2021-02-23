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
// app.get('/location')
// function locationCallback(req, res){
//   res.send()
// }

app.listen(PORT, () => console.log(`app is up on port http://localhost:${PORT}`))