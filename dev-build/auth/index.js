'use strict';

var OAuth2Server = require('oauth2-server');

var passwordModel = require("./password-model");

module.exports = {

    server: OAuth2Server({
        model: passwordModel,
        grants: ['password'],
        debug: true
    })

};