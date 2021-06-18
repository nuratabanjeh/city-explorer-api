const axios = require('axios');
const MOVIE_API_KEY = process.env.MOVIE_API_KEY;


class MovieClass {

  constructor(object) {
 
this.title= object.title 
this.overview= object.overview;
this.average_votes= object.vote_average;
this.total_votes= object.vote_count;
this.image_url=object.poster_path;
this.popularity = object.popularity;
this.released_on = object.release_date;

   

  }
}



//  movies function
// https://api.themoviedb.org/3/search/movie?api_key=3a4f02a4bced4b37af4537c4fff9ea5d&query=
function gettingMovies(request, response) {
  let movie = request.query.desired_city;

  let movieUrlReq = `https://api.themoviedb.org/3/search/movie?api_key=${MOVIE_API_KEY}&query=${movie}`;
  axios
    .get(movieUrlReq)
    .then(results => {
      let movieArray = []
      for (let index = 0; index <  results.data.results.length; index++) {
        let movie = results.data.results[index];
        let movieObject = new MovieClass(movie)
        movieArray.push(movieObject)
      }
      
      response.send(movieArray);
    })
}

module.exports = gettingMovies;
