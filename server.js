require('dotenv').config();
const express = require("express");
const weatherData = require("./assest/weather.json");
const cors = require("cors");
const server = express();

const PORT = process.env.PORT || 3001;

server.use(cors());

server.get("/", (req, res) => {
    res.send("testing");
});

server.get("/weatherAll", (req, res) => {
    res.send(weatherData);
});

server.get("/weather", (req, res) => {
    let lat = req.query.lat;
    console.log("🚀 ~ file: server.js ~ line 21 ~ server.get ~ req", req.query)
    let lon = req.query.lon;
    let searchQuery = req.query.searchQuery;

    let result = "";
    if (
        lat == weatherData.lat &&
        lon == weatherData.lon &&
        searchQuery == weatherData.city_name
    ) {
        result = weatherData.data;
        res.status(200).send(result);
    } else {
        result = "Not Found";
        res.status(500).send(result);
    }

});

server.listen(PORT, () => {
    console.log(`listen on port ${PORT}`);
});