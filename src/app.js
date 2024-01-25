const express = require('express');
const app = express();
const morgan = require('morgan');
const helmet = require('helmet');
const compression = require('compression');

// init middleware
app.use(morgan('dev'));
app.use(helmet());
app.use(compression());

// init db
require('./dbs/init.mongodb');

const { checkOverLoad } = require('./helpers/check.connect');
checkOverLoad();
// init route
app.get('/', (req, res, next) => {
  const strCompression = 'Hello World'
  return res.status(200).json({
    message: 'Hello World!',
    metadata: strCompression.repeat(1000000)
  });
})

// handle error

module.exports = app;