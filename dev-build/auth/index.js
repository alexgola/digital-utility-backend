'use strict';

var OAuth2Server = require('oauth2-server');
var passwordModel = require('./password-model');
var constants = require('../constants');

var server = OAuth2Server({
    model: passwordModel,
    grants: ['password', 'refresh_token'],
    debug: true,
    accessTokenLifeTime: constants.ACCESS_TOKEN_LIFE_TIME,
    refreshTokenLifetime: constants.REFRESH_TOKEN_LIFE_TIME
});

server.errorHandler = function () {
    return function (err, req, res, next) {
        if (err) {
            res.status(500).send(err);
        }
        next();
    };
};

module.exports = { server: server };