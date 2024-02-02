'use strict';

const shopModel = require('../models/shop.model')
const bcrypt = require('bcrypt')
const crypto = require('node:crypto')
const KeyTokenService = require('./keyToken.service')
const { createTokenPair } = require('../auth/authUtils')
const { getInfoData } = require('../utils/index')

const RoleShop = {
  SHOP: 'SHOP',
  WRITER: 'WRITER',
  EDITOR: 'EDITOR',
  ADMIN: 'ADMIN'
}
class AuthService {
  
  static signUp = async ({email, name, password}) => {
    try {
      const holerShop = await shopModel.exists({ email });
      if (holerShop) {
        return {
          code: 'xxx',
          message: 'Email already exists'
        }
      }
      const passwordHash = await bcrypt.hash(password, 10)
      const newShop = await shopModel.create({
        name, email, password: passwordHash, roles: [RoleShop.SHOP]
      })
      console.log(1);
      if (newShop) {
        // const {privateKey, publicKey} = crypto.generateKeyPairSync('rsa', {
        //   modulusLength: 4096,
        //   publicKeyEncoding: {
        //     type: 'pkcs1',
        //     format: 'pem'
        //   },
        //   privateKeyEncoding: {
        //     type: 'pkcs1',
        //     format: 'pem'
        //   }
        // })
        
        const privateKey = crypto.randomBytes(64).toString('hex');
        const publicKey = crypto.randomBytes(64).toString('hex');
        
        const keyStore = await KeyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey,
          privateKey
        });
        
        if (!keyStore) {
          return {
            code: 'xxx',
            message: 'keyStore error'
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
            shop: getInfoData({fields: ['_id', 'name', 'email'], object: newShop}),
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