const axios = require('axios');
const WEATHER_API_KEY = process.env.WEATHER_API_KEY;


class ForeCast {

  constructor(object) {

    this.description = `Low of : ${object.low_temp} and a high of ${object.max_temp} with a ${object.weather.description} `
    
    this.date = object.datetime;

  }
}


//weather function
function gettingWeather(request, response) {
console.log("🚀 ~ file: weather.js ~ line 19 ~ gettingWeather ~ request", request.query)
  
  let latitude = request.query.lat;
let longitude = request.query.lon;
  let weathUrlReq = `http://api.weatherbit.io/v2.0/forecast/daily?&lat=${latitude}&lon=${longitude}&key=${WEATHER_API_KEY}`

  

  axios
    .get(weathUrlReq)
    .then(results => {
      let arrayOFForcast = []
   for (let index = 0; index < results.data.data.length; index++) {
     let result = results.data.data[index];
     console.log('resul.data.data', result);
     let forecasts = new ForeCast(result);
     arrayOFForcast.push(forecasts)
     
   }
      response.status(200).send(arrayOFForcast);

    })
    .catch(err => {
      response.status(500).send(`error in getting data ==> ${err}`)
    })
}

module.exports = gettingWeather;
