const express = require('express');
const routes = require('./routes/api');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// set up express app
const app = express();
// listen for requests

// connecte to mongoose : ninjago--> database
mongoose.connect('mongodb://localhost/ninjago');
mongoose.Promise = global.Promise;

app.use(bodyParser.json());

//routing 
app.use('/api', routes);
// error handaling middleware
app.use(express.static('public'));
app.use((err, red, res, next) => {
    //console.log(err);
    res.status(402).send({ error: err.message })
})
app.listen(process.env.port || 3000, () => {
    console.log('now listening for request');
});
