'use strict';

var express = require('express');
var crypto = require('crypto');
var router = express.Router();


var auth = require("../auth/index");
var logic = require("../commons/logics/user-logic");

router.post('/registration', function (req, res) {
  var body = req.body;
  logic.doUserRegistration(body).then(function () {
    var secret = 'abcdefg';
    var hash = crypto.createHmac('sha256', secret).update('I love cupcakes').digest('hex');
    console.log(hash);
    res.send({
      result: true

    });
  });
});

router.get('/:id', auth.server.authorise(), function (req, res) {
  var body = req.body;

  console.log(body);
  res.render('comments/comment', { comment: "asd" });
});

module.exports = router;