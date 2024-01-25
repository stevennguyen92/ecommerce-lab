'use strict';
const mongoose = require('mongoose');
const connectString = 'mongodb://0.0.0.0:27017/shop-hoa';

mongoose.connect(connectString).then( _ => console.log('Connected to mongodb')).catch(err => console.log('Error connecting to mongodb : ' + err));

// dev
if (1 === 0) {
  mongoose.set('debug', true);
  mongoose.set('debug', {color: true});
}

module.exports = mongoose;