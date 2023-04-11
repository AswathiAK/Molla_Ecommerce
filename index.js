require('dotenv').config();
const mongoose = require("mongoose");
mongoose.set('strictQuery',true);
mongoose.connect("mongodb://127.0.0.1:27017/eCommerce");

const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");

const app = express();
app.use(session({
  secret:process.env.SESSION_SECRET,
  resave:false,
  saveUninitialized:false
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.set('view engine','ejs');
app.set('views', './views');
app.use(express.static('public'));

app.use(function(req, res, next) { 
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
   next();
 });

//for user routes
const userRoute = require('./routes/userRoute');
app.use('/',userRoute);

//for admin router
const adminRoute = require('./routes/adminRoute');
app.use('/admin',adminRoute);

const {notFound,errorHandler} = require('./middleware/errorHandling');
app.use('*',notFound);
app.use(errorHandler);

app.listen(5000, function () {
  console.log("Server is running at PORT:5000");
});
