'use strict';

const authService = require('../services/auth.service')
class AuthController {
  
  signUp = async (req, res, next) => {
    try {
      console.log('[P]::signUp::', req.body);
      return res.status(201).json(await authService.signUp(req.body));
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AuthController();