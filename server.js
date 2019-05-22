const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const users = require('./src/routes/users');
const clients = require('./src/routes/clients');
const alerts = require('./src/routes/alerts');

const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Connect to DB
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('MongoDB Connected');
  })
  .catch(err => {
    console.log(err);
  });

//Passport middleware
app.use(passport.initialize());

//Passport Config
require('./config/passport.js')(passport);

// Use Routes
app.use('/users', users);
app.use('/clients', clients);
app.use('/alerts', alerts);

// Set port and have server listen
const port = process.env.PORT;

app.listen(port, () => console.log(`Server running on port ${port}`));
