'use strict';

const mongoose = require('mongoose');
const os = require('os');
const process = require('process');
const _SECONDS = 10000;

// count connections
const countConnect = () => {
  const numConnections = mongoose.connections.length;
  console.log(`Mongoose default connection open to ${numConnections} database(s)`);
}

// check over load
const checkOverLoad = () => {
  setInterval(() => {
    const numConnections = mongoose.connections.length;
    const numCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;
    const maxConnections = numCores * 5;
    
    console.log(`Active connections: ${numConnections}`);
    console.log(`Memory usage: ${memoryUsage/1024/1024} MB`);
    
    if (numConnections > maxConnections) {
      console.log('Connections overload detected');
    }
  }, _SECONDS);
}

module.exports =  {
  countConnect,
  checkOverLoad
}