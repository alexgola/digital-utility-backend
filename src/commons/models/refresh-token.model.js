var mongoose = require('mongoose')
 
const RefreshToken = mongoose.model('RefreshToken', new mongoose.Schema({
    refreshToken: String, 
    clientId: String, 
    expires: Date, 
    userId: { type : mongoose.Schema.ObjectId, ref: 'User', default: [] },
}));

module.exports = RefreshToken; 
