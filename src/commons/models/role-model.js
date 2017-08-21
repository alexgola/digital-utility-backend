var mongoose = require('mongoose');
 
const Role = mongoose.model('Role', new mongoose.Schema({
    key: String, 
    isEnabled: Boolean
}))

module.exports = Role