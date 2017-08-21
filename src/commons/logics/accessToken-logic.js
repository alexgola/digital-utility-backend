const mongoose = require('mongoose');
// @flow
const models = require('../models/accessToken-model')
const repository = require('../repositories/accessToken-repository')


const add = async (accessToken: string, clientId: string, expires: Date, userId: string) => {
    await repository.create({ accessToken: accessToken, clientId: clientId, expires: expires, userId: mongoose.Types.ObjectId(userId)})
}

const getByAccessToken = async (accessToken: string) : any  => {
    return await repository.findByAccessToken(accessToken)
}

module.exports = {
    add: add, 
    getByAccessToken: getByAccessToken,
}