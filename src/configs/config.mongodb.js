'use strict';

const dev = {
  app: {
    port: process.env.APP_PORT || 3055
  },
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 27017,
    name: process.env.DB_NAME || 'test',
  }
}

const prod = {
  app: {
    port: process.env.APP_PORT || 3055
  },
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 27017,
    name: process.env.DB_NAME || 'test',
  }
}
const config = {dev, prod}
const env = process.env.NODE_ENV || 'dev'
module.exports = config[env];