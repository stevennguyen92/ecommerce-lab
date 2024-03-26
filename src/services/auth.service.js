'use strict';

const shopModel = require('../models/shop.model')
const bcrypt = require('bcrypt')
const crypto = require('node:crypto')
const KeyTokenService = require('./keyToken.service')
const { createTokenPair } = require('../auth/authUtils')
const { getInfoData } = require('../utils/index')
const { BadRequestError } = require('../core/error.response')

const { findByEmail } = require('./shop.service')

const RoleShop = {
  SHOP: 'SHOP',
  WRITER: 'WRITER',
  EDITOR: 'EDITOR',
  ADMIN: 'ADMIN'
}
class AuthService {
  
  static login = async({email, password, refreshToken = null}) => {
    const foundShop = await findByEmail({email})
    if (!foundShop) {
      throw new BadRequestError('Error: Shop not found!')
    }
    const isMatch = await bcrypt.compare(password, foundShop.password)
    if (!isMatch) {
      throw new BadRequestError('Error: Invalid password!')
    }
    const privateKey = crypto.randomBytes(64).toString('hex');
    const publicKey = crypto.randomBytes(64).toString('hex');
    
    const tokens = await createTokenPair({
      userId: foundShop._id,
      email
    }, publicKey, privateKey)
    
    await  KeyTokenService.createKeyToken({
      user: foundShop._id,
      publicKey,
      privateKey,
      refreshToken: tokens.refreshToken
    })
    
    return {
      shop: getInfoData({fields: ['_id', 'name', 'email'], object: foundShop}),
      tokens
    }
  }
  
  static signUp = async ({email, name, password}) => {
      const holerShop = await shopModel.exists({ email });
      if (holerShop) {
        throw new BadRequestError('Error: Shop already registered!')
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
          throw new BadRequestError('Error: Key store error')
        }
        // create token pair
        const tokens = await createTokenPair({
          userId: newShop._id,
          email
        }, publicKey, privateKey)
        
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
  }
  
}

module.exports = AuthService;