// @flow

const mongoose = require('mongoose');
const models = require('../models/refresh-token.model')
const repository = require('../repositories/refresh-token.repository')


const add = async (refreshToken: string, clientId: string, expires: Date, userId: string) => {
    await repository.create({ refreshToken: refreshToken, clientId: clientId, expires: expires, userId: mongoose.Types.ObjectId(userId)})
}

const remobveById = async (id: string) => {
    await repository.deleteById(id)
}

const getByRefreshToken = async (refreshToken: string) : any  => {
    return await repository.findByRefreshToken(refreshToken)
}

module.exports = {
    add: add, 
    getByRefreshToken: getByRefreshToken,
    remobveById: remobveById
}