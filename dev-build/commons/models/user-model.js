'use strict';

var mongoose = require('mongoose');

var User = mongoose.model('User', new mongoose.Schema({
    username: String,
    password: String,
    roles: [{ type: mongoose.Schema.ObjectId, ref: 'Role' }]
}));

module.exports = User;