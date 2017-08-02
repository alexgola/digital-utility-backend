// @flow
const Client = require('../models/client-model')

const findByClientId = async (clientId: string) => {
    return await Client.findOne({ clientId: clientId })
}

module.exports = {
    findByClientId: findByClientId,
}