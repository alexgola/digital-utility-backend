var mongoose = require('mongoose')
 
const AccessToken = mongoose.model('AccessToken', new mongoose.Schema({
    accessToken: String, 
    clientId: String, 
    expires: Date, 
    userId: { type : mongoose.Schema.ObjectId, ref: 'User', default: [] },
}));

module.exports = AccessToken; 