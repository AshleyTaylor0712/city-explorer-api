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

//Creating an instance of weather data
//will use this to match the city-name objects to the data.json
//we want the weather data to match what we are searching for
//const weatherData = require('./data/weather.json');

//getting data from app/site from the weather route. The weather route kicks off th weather handler function. Need to access data to display object. this is why we have /weather. passing in the weatherhandler function.
//app.get('/weather', weatherHandler);

//this is where I'm taking in request/response for the weather request.


  

  //what goes in quotes is what is getting sent back to front end
  //response.send('yay we made it weather function')

//weatherHandler is the callback function for app.get for the weather route
//app.get('/weather', weatherHandler);

//this is where I'm taking in request/response for the weather request.
// async function weatherHandler(request, response) {

// //This is the request url:
// //This is the request that we recieved: 
// //http://localhost:3001/weather?searchQuery=Seattle&lat=47.6038321&lon=-122.330062

// // http://localhost:3001/weather?searchQuery=atlanta&lat=33.7489924&lon=-84.3902644

//   //console logs for backend goterminal
//   //request is an object and query is an object that is a property of request object
//   console.log('the request', request.query);
//   //request.query is what is coming in from the front end. Everything after the question mark in the url
//   //http://localhost:3001/weather?searchQuery=Seattle&lat=47.6038321&lon=-122.330062
//   //request.query = { 
//     //searchQuery: 'seattle', 
//     //lat: '47.6038321', 
//     //lon: '-122.330062' 
//   //}
//   //console.log('Weatherdata', weatherData);

//   //THIS IS WHERE WE ARE MAKING A URL FOR OUR REQUEST TO THE WEATHERBIT API

//   //this is the request that we are going to make
//   let url = `http://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHERBIT_API_KEY}&units=i&days=5&lat=${request.query.lat}&lon=${request.query.lon}`;
 
//   //THIS IS WHERE I AM MAKING A REQUEST INTO AXIOS
//   let weatherData = await axios.get(url);
//   let weatherRequest = weatherData.data;
//   //Setting to a variable. using .find to find the specific city that is being typed into search bar. When we hit enter it hits this function and checks to see if it matches our weather.json. city is the index at 0 bc its before the arrow

//   //if this is true (matches request we are typing into searchbar) lets map through the data and showcase desire results;
//   if (weatherRequest) {
//     //looking at all the objects
//     const weatherArray = weatherRequest.data.map(
//       //console.log(weatherRequest.data, 'weatherRequest');
//       forecast => {
        
//         return new Forecast(forecast.valid_date, forecast.weather.description)}
//     );
//     //sending info from weather request
//     response.status(200).send(weatherArray);
//   }

//   //what goes in quotes is what is getting sent back to front end
//   //response.send('yay we made it weather function')
// }
// //creating a class. targetting forcast from above from weather.json. This is a data holder that displays our date and description in our browser.
// class Forecast {
//   constructor(date, description) {
//     //creating new objects using the this. notation aka what you want to display on your screen
//     this.date = date;
//     this.description = description;
//   }
// }

app.get('/movies', movieHandler);

//this is where I'm taking in request/response for the weather request.
// async function movieHandler(request, response) {

//   //The Green &query is the search value
//   //the request.query means the front end url (not always the front end in the wild)
//   let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${request.query.cityName}`;

//   console.log(movieUrl);
//   //THIS IS WHERE I AM MAKING A REQUEST INTO AXIOS
//   let movieData = await axios.get(movieUrl);
//   let movieRequest = movieData.data;
//   console.log('this is the movie request', movieRequest);
//   if (movieRequest) {
//     //looking at all the objects
//     const movieArray = movieRequest.results.map( movieObj =>  {
      
//         return new Movie(movieObj)
//       }
//     );
//     //sending info from weather request
//     response.status(200).send(movieArray);
//   }

// }
// //creating a class. targetting forcast from above from weather.json. This is a data holder that displays our date and description in our browser.
// class Movie {
//   constructor(movieObj) {
//     //creating new objects using the this. notation aka what you want to display on your screen
//     this.title = movieObj.original_title;
//     this.overview = movieObj.overview;
//     this.averageVotes = movieObj.vote_average;
//     this.totalVotes = movieObj.vote_count;
//     //to see the image we need the full website with the path aka img website link
//     this.image_url = 'https://image.tmdb.org/t/p/w500/' + movieObj.poster_path;
//     this.popularity = movieObj.popularity;
//     this.releaseDate = movieObj.release_date;
//   }
// }

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
