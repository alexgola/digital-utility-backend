// @flow
const models = require('../models/user-model')
const repository = require('../repositories/user-repository')

const doUserRegistration = async (req: UserRegistrationRequest) => {
    await repository.create(req); 
}


module.exports = {
    doUserRegistration: doUserRegistration   
}