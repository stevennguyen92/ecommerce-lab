const express = require('express');
const app = express();
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');

// init middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

// init db
require('./dbs/init.mongodb');

const { checkOverLoad } = require('./helpers/check.connect');
// init route
app.use('', require('./routes/index'));

// handle error

module.exports = app;