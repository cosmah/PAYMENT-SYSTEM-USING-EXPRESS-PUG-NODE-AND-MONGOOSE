const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const routes = require('./routes');

const config = require("./Config/database")


// mongoose.connect('mongodb://0.0.0.0:27017/payment-system', {useNewUrlParser: true, useUnifiedTopology: true});

// // support parsing of application/json type post data
// app.use(bodyParser.json());

// //support parsing of application/x-www-form-urlencoded post data
// app.use(bodyParser.urlencoded({ extended: true }));


//creating a connection between a controller and the database using mongoose middleware
mongoose.connect(config.database,{
  //useNewParser collects data then formats it  into what backend understands, 
  useNewUrlParser:true,
  useUnifiedTopology: true
})

const db = mongoose.connection
//check if db is connected successfully
db.once("open", ()=>{
  console.log("Connected to db")
})
db.on("error", (err)=>{
  console.error(err)
})



app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(routes)

app.listen(3000, () => {
    console.log('Listening at port 3000 "http://localhost:3000/"');
});
