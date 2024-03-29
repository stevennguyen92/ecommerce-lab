'use strict';
const mongoose = require('mongoose');
const {db : {host, name, port}} = require('../configs/config.mongodb')
const connectString = `mongodb://${host}:${port}/${name}`;
const { countConnect } = require('../helpers/check.connect')

class Database {
  constructor() {
    this.connect();
  }
  
  connect(type = 'mongodb') {
    // dev
    mongoose.set('debug', true);
    mongoose.set('debug', {color: true});
    
    mongoose.connect(connectString).then( _ => {
      countConnect()
      console.log('Connected to mongodb')
    })
      .catch(err => console.log('Error connecting to mongodb : ' + err));
  }
  
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

const instanceMongodb = Database.getInstance();

module.exports = instanceMongodb;