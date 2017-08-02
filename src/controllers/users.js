const express = require('express')
const crypto = require('crypto')
const router = express.Router()

// @flow
const auth = require("../auth/index") 
const logic = require("../commons/logics/user-logic")

router.post('/registration', function(req, res) {
  const body : UserRegistrationRequest = req.body;  
  logic.doUserRegistration(body).then(() => {
             const secret = 'abcdefg';
const hash = crypto.createHmac('sha256', secret)
                   .update('I love cupcakes')
                   .digest('hex');
console.log(hash);
       res.send({
         result: true

       })
  })
})

router.get('/:id', auth.server.authorise(),function(req, res) {
  const body : UserRegistrationRequest = req.body;
  
  console.log(body)
  res.render('comments/comment', {comment: "asd"})
})

module.exports = router
