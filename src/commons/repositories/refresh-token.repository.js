// @flow

const RefreshToken = require('../models/refresh-token.model')

const create = async (entity: any) => {
    return await new RefreshToken(entity).save()
}

const findByRefreshToken = async (refreshToken: string) => {
    return await RefreshToken.findOne({ refreshToken: refreshToken })
}

const deleteById = async (id: string) => {
    return await RefreshToken.remove({ _id: id })
}

module.exports = {
    create: create,
    findByRefreshToken: findByRefreshToken,
    deleteById: deleteById,
}