const express = require('express');
const router = express.Router();
const placesJSONFILE = require("./files/places.json");

router.use(function timeLog (req, res, next) {
    console.log('Api call => Time: ', Date.now())   
    next()
})

router.get('/getPlaces', (req, res) => {
    res.json(placesJSONFILE);
})
module.exports = router;
