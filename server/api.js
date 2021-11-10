const express = require('express');
const router = express.Router();
const placesJSONFILE = require("./files/places.json");
const linesJSONFILE = require("./files/buslines.json");

router.use(function timeLog (req, res, next) {
    console.log('Api call => Time: ', Date.now())   
    next()
})

router.get('/getPlaces', (req, res) => {
    res.json(placesJSONFILE);
})

router.get('/getLines', (req, res) => {
    console.log("test");
    res.json(linesJSONFILE);
})
module.exports = router;
