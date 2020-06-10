const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// set up express app
const app = express();

// connect to mongodb
mongoose.connect('mongodb://localhost/Championgo');
mongoose.Promise = global.Promise;


app.use(express.static('public'));
app.use(bodyParser.json());
app.use('/api', require('./routes/api'));

// error handling middleware
app.use(function (err, req, res, next) {
    console.log(err); // to see properties of message in our console
    res.status(422).send({ error: err.message });
});

// listen for requests
app.listen(process.env.port || 4000, function () {
    console.log('now listening for requests');
});
