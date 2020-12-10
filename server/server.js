const express = require('express');
const cors = require('cors');
const rp = require('request-promise');
const app = express();
require('dotenv').config()

app.use(cors())
app.use(express.json())

app.get('/getFood', (req, res) => {
    var options = {
        uri: `https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants&location=${req.query.lat},${req.query.lon}&radius=8000&key=${process.env.GOOGLE_API_KEY}`,
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true
    };
    rp(options)
        .then(function (response) {
            res.json(response.results)
        })
        .catch(function (err) {
            res.json(err)
        });
});

app.get('/getItemPhoto', (req, res) => {
    var options = {
        uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${req.query.reference}&key=${process.env.GOOGLE_API_KEY}`,
        headers: {
            'User-Agent': 'Request-Promise',
            'Content-Type': 'image/jpeg'
        },
    };
    rp(options)
        .then(function (response) {

        })
        .catch(function (err) {
            res.json(err)
        });
});

app.get('/getActivities', (req, res) => {
    res.json({ test: 'This is food endpoint' })
})

app.listen(8080);
console.log('server listening on 8080...');