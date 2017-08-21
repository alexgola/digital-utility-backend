// @flow
const AccessToken = require('../models/accessToken-model')

const create = async (entity: any) => {
    return await new AccessToken(entity).save()
}

const findByAccessToken = async (accessToken: string) => {
    return await AccessToken.findOne({ accessToken: accessToken })
}

module.exports = {
    create: create,
    findByAccessToken: findByAccessToken,
}