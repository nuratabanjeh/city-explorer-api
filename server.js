'use strict'

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const axios = require('axios');


const server = express();
server.use(cors());    //to make server opened for anyone
const PORT = process.env.PORT;





server.listen(PORT, () => {
    console.log(`Server Listining on PORT ${PORT}`);
})


class Movie {
    constructor(item) {
        this.title = item.title,
            this.overview = item.overview,
            this.average_votes = item.vote_average,
            this.total_votes = item.vote_count,
            this.image_url = item.poster_path,
            this.popularity = item.popularity,
            this.released_on = item.release_date
    }
}


server.get('/test', (req, res) => {
    res.status(200).send('hello from back end');
})



server.get('/weather', weatherHandler)

function weatherHandler(req, res) {
    let cityQuery = req.query.city;
    let key = process.env.WEATHER_API_KEY;

    let url = `http://api.weatherbit.io/v2.0/current?city=${cityQuery}&key=${key}`

    axios
        .get(url)
        .then(result => {
            console.log('inside promise');
            let cityData = {
                description: result.data.data[0].weather.description,
                solarRad: result.data.data[0].solar_rad,
                windSpd: result.data.data[0].wind_spd,
                windDir: result.data.data[0].wind_dir,
                temp: result.data.data[0].temp
            }
            console.log(cityData);
            res.send(cityData);
        })
        .catch(err => {
            console.log('inside error');
            res.status(500).send(`error in getting data ==> ${err}`)
        })
}


server.get('/movies', moviesHandler)

function moviesHandler(req, res) {
    let cityQuery = req.query.city;
    let key = process.env.MOVIE_API_KEY;

    let url = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query==${cityQuery}`

    axios
        .get(url)
        .then(result => {
            console.log('inside promise');
            let cityData = result.data.results.map(movieItem => {
                return new Movie(movieItem)
            })
            console.log(cityData);
            res.send(cityData);
        })
        .catch(err => {
            console.log('inside error');
            res.status(500).send(`error in getting data ==> ${err}`)
        })
}






server.get('*', (req, res) => {
    res.send('Error: Something went wrong.');
})
