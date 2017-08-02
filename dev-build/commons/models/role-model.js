'use strict';

var mongoose = require('mongoose');

var Role = mongoose.model('Role', new mongoose.Schema({
    key: String,
    isEnabled: Boolean
}));

module.exports = Role;