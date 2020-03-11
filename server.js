const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const path = require('path');
const users = require('./src/routes/users');
const clients = require('./src/routes/clients');
const alerts = require('./src/routes/alerts');
const dataAPI = require('./src/routes/apiRoutes')

const app = express();

//Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//DB Config
const db = require('./config/keys').MONGODB_URL;

// Connect to DB
mongoose
  .connect(db, {
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
app.use('/api', dataAPI)

// Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Set port and have server listen
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
