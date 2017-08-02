// @flow
const User = require('../models/user-model')


const find = async () => {
    return await User.find()
}

const findByUsername = async (username: string) => {
    return await User.findOne({ username: username })
}

const create = async () => {
    //return await User.create()
}

module.exports = {
    findByUsername: findByUsername,
    create: create, 
    find: find,
}