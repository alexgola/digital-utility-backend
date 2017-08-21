// @flow 

var mongoose = require('mongoose')
 
const User = mongoose.model('User', new mongoose.Schema({
    username: String, 
    password: String, 
    roles: [{ type : mongoose.Schema.ObjectId, ref: 'Role', default: [] }],
    salt: String, 
    email: String, 
    creationTimestamp: { type : Date, default: Date.now },
}))

module.exports = User