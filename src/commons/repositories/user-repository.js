// @flow
const User = require('../models/user-model')
const mongoose = require('mongoose')


const find = async () => {
    return await User.find()
}

const findSingle = async (id: string) => {
    return await User.findOne({ _id: mongoose.Types.ObjectId(id) })
}

const findByUsername = async (username: string) => {
    return await User.findOne({ username: username })
}

const create = async (user: any) => {
    return await new User(user).save()
}

module.exports = {
    findByUsername: findByUsername,
    findSingle: findSingle,
    create: create, 
    find: find,
}