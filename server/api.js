const express = require('express');
const fs = require('fs');
const router = express.Router();
const placesJSONFILE = require("./files/places.json");
const linesJSONFILE = require("./files/buslines.json");

router.use(express.json({extended: false}));
router.use(function timeLog (req, res, next) {
    console.log('Api call => Time: ', Date.now())   
    next()
})

router.get('/getPlaces', (req, res) => {
    res.json(placesJSONFILE);
})

router.get('/getLines', (req, res) => {
    res.json(linesJSONFILE);
})

router.post('/updatePlaces', (req, res) => {
    console.log('body :', req);
    fs.writeFileSync(__dirname + "/../public/places.json", req.body);
})

module.exports = router;
