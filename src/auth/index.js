// @flow

const OAuth2Server = require('oauth2-server')
const passwordModel = require('./password-model')
const constants = require('../constants')



const server = OAuth2Server({
            model: passwordModel, 
            grants: ['password', 'refresh_token'],
            debug: true, 
            accessTokenLifeTime: constants.ACCESS_TOKEN_LIFE_TIME,
            refreshTokenLifetime: constants.REFRESH_TOKEN_LIFE_TIME,
        })

server.errorHandler = () => {
    return (err, req, res, next) => {
        if(err) {
            res.status(500).send(err)
        }
        next();
    }
}

module.exports = { server: server}