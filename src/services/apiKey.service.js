'use strict';

const apiKeyModel = require('../models/apiKey.model')
const crypto = require('node:crypto')

const findById = async ( key ) => {
  // const newKey = await apiKeyModel.create({ key: crypto.randomBytes(64).toString('hex'), permissions: ['0000']})
  // console.log(`new key: `, newKey);
  return apiKeyModel.findOne({key, status: true}).lean();
};

module.exports = {
  findById
}