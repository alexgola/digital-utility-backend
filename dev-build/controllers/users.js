'use strict';

var express = require('express');
var router = express.Router();

var auth = require("../auth/index");

router.post('/', auth.server.authorise(), function (req, res) {
  user = req.user.id;
  text = req.body.text;
});

router.get('/:id', auth.server.authorise(), function (req, res) {
  res.render('comments/comment', { comment: "asd" });
});

module.exports = router;