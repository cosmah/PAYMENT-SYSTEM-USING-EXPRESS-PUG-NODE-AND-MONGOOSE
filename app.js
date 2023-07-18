const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const routes = require('./routes');
const routes2 = require('./routes2');
const routes3 = require('./routes3');

const config = require("./Config/database")



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
//routes
app.use(routes);
app.use(routes2);
app.use(routes3);

app.listen(3000, () => {
    console.log('Listening at port 3000 "http://localhost:3000/"');
});
