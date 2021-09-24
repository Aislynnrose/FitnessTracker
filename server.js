// required dependencies
const express = require('express');
const mongoose = require('mongoose');
const logger = require('logger');
const path = require('path');

require('dotenv').config();

// Create port
const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workout",{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}).then(() => {
  console.log(`You're connected!`);
}).catch(err => console.log(err));

const app = express();

// logger
app.use(logger('dev'));

app.use(express.static(path.join(__dirname, 'public')));

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.use(require('./routes/apiRoutes'));
app.use(require('./routes/htmlRoutes'));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});