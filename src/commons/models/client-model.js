var mongoose = require('mongoose');
 
const Client = mongoose.model('Client', new mongoose.Schema({
    clientId: String, 
    clientSecret: String, 
    roles: [{ type : mongoose.Schema.ObjectId, ref: 'Role' }], 
    grants: [{ type: String }],
    redirectUris: [{ type: String }]
}));

module.exports = Client;