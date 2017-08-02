const express = require('express')
const router = express.Router()


// @flow

router.use('/users',require('./users'))

router.get('/', function (req, res) {
  res.send('Secret area')
})
 


module.exports = router
