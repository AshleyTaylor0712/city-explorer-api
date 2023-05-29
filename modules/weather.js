'use strict';
const axios = require('axios');

let cache = require('./cache.js');

let weatherHandler = async (request, response, next) => {
  let key = request.query.lat + request.query.lon

    console.log('the request', request.query);
   
    let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHERBIT_API_KEY}&units=i&days=5&lat=${request.query.lat}&lon=${request.query.lon}`;
   

    let weatherData = await axios.get(url);
    let weatherRequest = weatherData.data;
    
    if (weatherRequest) {
      //looking at all the objects
      const weatherArray = weatherRequest.data.map(
        
        forecast => {
          
          return new Forecast(forecast.valid_date, forecast.weather.description)}
      );
      //sending info from weather request
      response.status(200).send(weatherArray);
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
  }

  // if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
  //   console.log('Cache hit');
  // } else {
  //   console.log('Cache miss');
  //   cache[key] = {};
  //   cache[key].timestamp = Date.now();
  //   let result = await axios.get(url);

  //   try {
  //     cache[key].data = result.data;
  //     let cityData = cache[key].data;
  //     let dataToGroom = cityData.data;
  //     let dataToSend = dataToGroom.map(object => {
  //       return new Weather(object);
  //     });
  //     response.status(200).send(dataToSend);
  //   } catch (error) {
  //     next(error)
  //   }
  // }

  //creating a class. targetting forcast from above from weather.json. This is a data holder that displays our date and description in our browser.
  class Forecast {
    constructor(date, description) {
      //creating new objects using the this. notation aka what you want to display on your screen
      this.date = date;
      this.description = description;
    }
  }

module.exports = weatherHandler;
