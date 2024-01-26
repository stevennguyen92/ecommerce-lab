'use strict';

const express = require("express");
const router = express.Router();


router.use('/v1/api', require('../routes/auth/index'));
// router.get('/', (req, res, next) => {
//   return res.status(200).json({
//     message: 'Hello World!'
//   });
// })

module.exports = router;