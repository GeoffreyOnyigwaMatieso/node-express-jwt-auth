require('dotenv').config(); // to use .env file
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser'); // to use cookies 


const app = express();

// middleware
app.use(express.static('public'));
app.use(express.json()); // to handle json data  // express.json() is a method inbuilt in express to recognize the incoming Request Object as a JSON Object. This method is called as a middleware in your application using the code: app. use(express. json());
app.use(cookieParser()); // to use cookies
// view engine
app.set('view engine', 'ejs');


// database connection
const dbURI = process.env.dbURI;
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes);

// cookies 
app.get('/set-cookies', (req, res) => {

  // res.setHeader('Set-Cookie', 'newUser=true'); // key value pair

  res.cookie('newUser', false); // key value pair
  res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true }); // key value pair

  res.send('you got the cookies!');

});


app.get('/read-cookies', (req, res) => {
  const cookies = req.cookies;
  console.log(cookies);

  res.json(cookies)
});