'use strict';

const authService = require('../services/auth.service')
const { OK, CREATED, SuccessResponse } = require('../core/success.response')
class AuthController {
  
  login = async (req, res, next) => {
    new SuccessResponse({
      message: 'User logged in successfully',
      metadata: await authService.login(req.body),
      options: {
        limit: 10
      }
    }).send(res)
  }
  
  signUp = async (req, res, next) => {
    new CREATED({
      message: 'User created successfully',
      metadata: await authService.signUp(req.body),
      options: {
        limit: 10
      }
    }).send(res)
  }
}

module.exports = new AuthController();