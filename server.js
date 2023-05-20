'use strict';

const express = require('express');
require('dotenv').config();

//Creating an instance of weather data
const weatherData = require('./data/weather.json');
const app = express();

//defining PORT
const PORT = process.env.PORT || 3002;

//Routes are used to access endpoints
app.get('/', (request, response) => {
  response.send('it lives');
});

app.get('')

//The catch all
app.get('*', (request, response) => {
  response.send('the thing you are looking for does not exist');
});

//Listen starts the server
app.listen(PORT, () => console.log(`listening on ${PORT}`));
