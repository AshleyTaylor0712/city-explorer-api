'use strict';

//const axios = require('axios');

//bringing in .env file
require('dotenv').config();
//making a new express var; require: like import
const express = require('express');
//cross origin resource sharing; who can I share date with?
// cors secures data
const cors = require('cors');
const weatherHandler = require('./modules/weather');
const movieHandler = require('./modules/movie');

//defining PORT
const PORT = process.env.PORT || 3002;
//app is an instanse of express. express helps with site setup
const app = express();
//our app wants security so we give it cors
app.use(cors());

app.get('/weather', weatherHandler);
app.get('/movies', movieHandler);



//Routes are used to access endpoints
// request is pulling data from front end.
app.get('/', (request, response) => {
  //repsone is what we send back to the front end.
  response.send('it lives');
});
//any line with app is talking about our site. (the backend)

//* is the catch all. * is used for a slash route that doesnt exist.
app.get('*', (request, response) => {
  response.send('the thing you are looking for does not exist');
});

//Listen starts the server
app.listen(PORT, () => console.log(`listening on ${PORT}`));
