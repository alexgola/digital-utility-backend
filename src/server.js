const express = require('express')
const bodyParser = require('body-parser')
const auth = require('./auth/index')

const app = express();
 
app.use(bodyParser.urlencoded({ extended: true }));
 
app.use(bodyParser.json());
 
app.all('/oauth/token',auth.server.grant())
app.use(require('./controllers'))

app.use(auth.server.errorHandler())
 
app.listen(3000)
console.log("Server is running ... ")
