'use strict';

var mongoose = require('mongoose');

var uri = 'mongodb://localhost:27017/test';
mongoose.Promise = require("bluebird");
var db = mongoose.connect(uri, { useMongoClient: true }).then(function () {
  return console.log("MongoDB connected.");
});