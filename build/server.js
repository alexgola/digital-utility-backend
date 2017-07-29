'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var oauthserver = require('oauth2-server');
var auth = require("./auth/index.auth");

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.oauth = oauthserver({
  model: auth.passwordModel,
  grants: ['password'],
  debug: true
});

app.all('/oauth/token', app.oauth.grant());

app.get('/', app.oauth.authorise(), function (req, res) {
  res.send('Secret area');
});

app.use(app.oauth.errorHandler());

app.listen(3000);
console.log("Server is running ... ");