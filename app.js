const { config } = require('dotenv');
const express = require('express');
const mongoose  = require('mongoose');
const bodyParser =  require('body-parser');
require('dotenv/config')

const app = express();

app.use(bodyParser.json())


//Import routes
const postRoute = require('./routes/posts');

app.use('/posts',postRoute);

//ROUTES
app.get('/', (req, res)=> {
    res.send('We are on home');
})


//Connect to DB
mongoose.connect(process.env.DB_CONNECTION, () => {
    console.log("Connect to DB");
})
//Start listening to the server
const port = process.env.PORT || 3000;
app.listen(port)