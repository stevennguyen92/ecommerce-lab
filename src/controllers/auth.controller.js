'use strict';

const authService = require('../services/auth.service')
class AuthController {
  
  signUp = async (req, res, next) => {
      return res.status(201).json(await authService.signUp(req.body));
  }
}

module.exports = new AuthController();