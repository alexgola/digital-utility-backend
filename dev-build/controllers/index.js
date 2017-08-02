'use strict';

var express = require('express');
var router = express.Router();

router.use('/users', require('./users'));

router.get('/', function (req, res) {
  res.send('Secret area');
});

module.exports = router;