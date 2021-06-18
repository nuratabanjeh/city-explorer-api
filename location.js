const axios = require('axios');
const LOCATION_API_KEY = process.env.LOCATION_API_KEY;
console.log('🚀 ~ file: location.js ~ line 3 ~ LOCATION_API_KEY', LOCATION_API_KEY)

function gettingLocation(request, response) {
  let location = request.query.batata;
  let locationUrlReq = `https://eu1.locationiq.com/v1/search.php?key=${LOCATION_API_KEY}&q=${location}&format=json`;
  console.log('🚀 ~ file: location.js ~ line 8 ~ gettingLocation ~ locationUrlReq', locationUrlReq)
  axios
    .get(locationUrlReq)
    .then(results => {
      let locations = results.data[0];
      console.log("🚀 ~ file: location.js ~ line 13 ~ gettingLocation ~ results", results.data)
      response.send(locations);
    })
}

module.exports = gettingLocation;
