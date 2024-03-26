'use strict';

const keyTokenModel = require('../models/keyToken.model')

class KeyTokenService {
  
  static createKeyToken = async ({userId, publicKey, privateKey, refreshToken}) => {
    try {
      // level 0
      // const token = await keyTokenModel.create({
      //   user: userId,
      //   publicKey,
      //   privateKey
      // })
      // return token ? token.publicKey : null;
      
      // level 1
      const filter = {user : userId}
      const update = {publicKey, privateKey, refreshTokensUsed : [], refreshToken}
      const options = {new: true, upsert: true}
      
      const token = await keyTokenModel.findOneAndUpdate(filter, update, options)
      return token? token.publicKey : null;
    } catch (error) {
      return error;
    }
  }
}

module.exports = KeyTokenService;