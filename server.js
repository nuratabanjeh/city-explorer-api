require('dotenv').config();
const express = require("express");
const weatherHandler = require("./assest/weather.json");
const cors = require("cors");
const server = express();

const PORT = process.env.PORT || 3001;

server.use(cors());

server.get("/", (req, res) => {
    res.send("test test 1 2 1 2");
});

server.get("/weatherAll", (req, res) => {
    res.send(weatherHandler);
});

server.get("/weather", (req, res) => {
    let lat = req.query.lat;
    let lon = req.query.lon;
    let searchQuery = req.query.searchQuery;

    let result = "";
    if (
        lat == weatherHandler.lat &&
        lon == weatherHandler.lon &&
        searchQuery == weatherHandler.city_name
    ) {
        result = weatherHandler.data;
    } else {
        result = "Not Found";
    }
    res.status(500).send(result);
});

server.listen(PORT, () => {
    console.log(`listen on port ${PORT}`);
});