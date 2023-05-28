'use strict';
const axios = require('axios');

let cache = require('./cache.js');

async function movieHandler(request, response) {

  //The Green &query is the search value
  //the request.query means the front end url (not always the front end in the wild)
  let movieUrl = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${request.query.cityName}`;

  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    let movieData = await axios.get(movieURL);

    try {
      cache[key].data = movieData.data.results;
      let movieDataToSend = cache[key].data.map(object => {
        return new Movies(object);
      });
      response.status(200).send(movieDataToSend)
    } catch (error) {
      next(error)
    }
  }
};

  console.log(movieUrl);
  //THIS IS WHERE I AM MAKING A REQUEST INTO AXIOS
  let movieData = await axios.get(movieUrl);
  let movieRequest = movieData.data;
  console.log('this is the movie request', movieRequest);
  if (movieRequest) {
    //looking at all the objects
    const movieArray = movieRequest.results.map( movieObj =>  {
      
        return new Movie(movieObj)
      }
    );
    //sending info from weather request
    response.status(200).send(movieArray);
  }

//creating a class. targetting forcast from above from weather.json. This is a data holder that displays our date and description in our browser.
class Movie {
  constructor(movieObj) {
    //creating new objects using the this. notation aka what you want to display on your screen
    this.title = movieObj.original_title;
    this.overview = movieObj.overview;
    this.averageVotes = movieObj.vote_average;
    this.totalVotes = movieObj.vote_count;
    //to see the image we need the full website with the path aka img website link
    this.image_url = 'https://image.tmdb.org/t/p/w500/' + movieObj.poster_path;
    this.popularity = movieObj.popularity;
    this.releaseDate = movieObj.release_date;
  }
}

module.exports = movieHandler;
