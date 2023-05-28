'use strict';
const axios = require('axios');

let cache = require('./cache.js');

async function weatherHandler(request, response) {

  //This is the request url:
  //This is the request that we recieved: 
  //http://localhost:3001/weather?searchQuery=Seattle&lat=47.6038321&lon=-122.330062
  
  // http://localhost:3001/weather?searchQuery=atlanta&lat=33.7489924&lon=-84.3902644
  
    //console logs for backend goterminal
    //request is an object and query is an object that is a property of request object
    console.log('the request', request.query);
    //request.query is what is coming in from the front end. Everything after the question mark in the url
    //http://localhost:3001/weather?searchQuery=Seattle&lat=47.6038321&lon=-122.330062
    //request.query = { 
      //searchQuery: 'seattle', 
      //lat: '47.6038321', 
      //lon: '-122.330062' 
    //}
    //console.log('Weatherdata', weatherData);
  
    //THIS IS WHERE WE ARE MAKING A URL FOR OUR REQUEST TO THE WEATHERBIT API
  
    //this is the request that we are going to make
    let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHERBIT_API_KEY}&units=i&days=5&lat=${request.query.lat}&lon=${request.query.lon}`;
   
    //THIS IS WHERE I AM MAKING A REQUEST INTO AXIOS
    let weatherData = await axios.get(url);
    let weatherRequest = weatherData.data;
    //Setting to a variable. using .find to find the specific city that is being typed into search bar. When we hit enter it hits this function and checks to see if it matches our weather.json. city is the index at 0 bc its before the arrow
  
    //if this is true (matches request we are typing into searchbar) lets map through the data and showcase desire results;
    if (weatherRequest) {
      //looking at all the objects
      const weatherArray = weatherRequest.data.map(
        //console.log(weatherRequest.data, 'weatherRequest');
        forecast => {
          
          return new Forecast(forecast.valid_date, forecast.weather.description)}
      );
      //sending info from weather request
      response.status(200).send(weatherArray);
    }
  
    //what goes in quotes is what is getting sent back to front end
    //response.send('yay we made it weather function')
  }

  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    let result = await axios.get(url);

    try {
      cache[key].data = result.data;
      let cityData = cache[key].data;
      let dataToGroom = cityData.data;
      let dataToSend = dataToGroom.map(object => {
        return new Weather(object);
      });
      response.status(200).send(dataToSend);
    } catch (error) {
      next(error)
    }
  }

  //creating a class. targetting forcast from above from weather.json. This is a data holder that displays our date and description in our browser.
  class Forecast {
    constructor(date, description) {
      //creating new objects using the this. notation aka what you want to display on your screen
      this.date = date;
      this.description = description;
    }
  }

module.exports = weatherHandler;
