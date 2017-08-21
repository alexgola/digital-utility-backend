// @flow
const models = require('../models/user-model')
const repository = require('../repositories/user-repository')

const cryptoHelper = require('../../helpers/crypto-helper')
const randomHelper = require('../../helpers/random-helper')
const constants = require("../../constants")
const mongoose = require('mongoose');

const doUserRegistration = async (req: UserRegistrationRequest) => {
    const salt : string = randomHelper.randomString(constants.USER_PASSWORD_SALT_LENGHT)
    const passwordEncrypt : string = cryptoHelper.hash256(req.password + salt)

    
    // create encrypted password
    req.password = passwordEncrypt
    req.salt = salt

    await repository.create(req);
}

const getUser = async (username: string, password: string) : Promise<?any> => {
    const user = await repository.findByUsername(username)
    if(user == null) return null

    const passwordEncrypt : string = cryptoHelper.hash256(password + user.salt)

    if(user.password === passwordEncrypt) return user
    
    return null
}

const getUserById = async (userId: string)  =>{
    return await repository.findSingle(userId)
}

module.exports = {
    doUserRegistration: doUserRegistration, 
    getUser: getUser,
    getUserById: getUserById
}