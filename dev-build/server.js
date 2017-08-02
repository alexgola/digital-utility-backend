'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var auth = require('./auth/index');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.all('/oauth/token', auth.server.grant());
app.use(require('./controllers'));

app.use(auth.server.errorHandler());

app.listen(3000);
console.log("Server is running ... ");