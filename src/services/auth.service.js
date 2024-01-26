'use strict';

const shopModel = require('../models/shop.model')
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const KeyTokenService = require('./keyToken.service')
const { createTokenPair } = require('../auth/authUtils')

const RoleShop = {
  SHOP: 'SHOP',
  WRITER: 'WRITER',
  EDITOR: 'EDITOR',
  ADMIN: 'ADMIN'
}
class AuthService {
  
  static signUp = async (email, name, password) => {
    try {
      const holerShop = await shopModel.findOne({ email}, {}, {}).lean();
      if (holerShop) {
        return {
          code: 'xxx',
          message: 'Email already exists'
        }
      }
      const passwordHash = await bcrypt.hash(password, 10)
      const newShop = await shopModel.create({
        name, email, password: passwordHash, roles: [RoleShop.SHOP]
      }, {})
      
      if (newShop) {
        const {privateKey, publicKey} = crypto.generateKeyPairSync('rsa', {
          modulusLength: 4096
        })
        
        const publicKeyString = await KeyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey
        });
        
        if (!publicKeyString) {
          return {
            code: 'xxx',
            message: 'Something went wrong'
          }
        }
        
        // create token pair
        const tokens = await createTokenPair({
          userId: newShop._id,
          email
        }, publicKey, privateKey)
        
        console.log(`Created token success::${tokens}`);
        
        return {
          code: 201,
          metadata: {
            shop: newShop,
            tokens
          }
        }
      }
      
      return {
        code: 200,
        metadata: null
      }
      
    } catch (e) {
      return {
        code: 'xxx',
        message: e.message,
        status: 'error'
      }
    }
  }
  
}

module.exports = AuthService;