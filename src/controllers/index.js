// @flow
import type { $Request, $Response } from 'express';
const express = require('express')
const router = express.Router()

router.use('/users',require('./users'))

router.get('/', function (req: $Request, res: $Response) {
  res.send('Secret area')

})
 

module.exports = router
