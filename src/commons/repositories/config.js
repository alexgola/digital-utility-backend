const mongoose = require('mongoose')

const uri = 'mongodb://localhost:27017/test'
mongoose.Promise = require("bluebird")
const db = mongoose.connect(uri, { useMongoClient: true }).then(() => console.log("MongoDB connected."))
