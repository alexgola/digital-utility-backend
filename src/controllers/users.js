// @flow

const express = require('express')
const router = express.Router()

const auth = require("../auth/index") 
const UserLogic = require("../commons/logics/user-logic")

router.post('/registration', function(req: $Request, res:$Response) {
  const body : UserRegistrationRequest = req.body;  
  UserLogic.doUserRegistration(body).then(() => {
       res.send({
         result: true
       })
  })
})


router.get('/me', auth.server.authorise(), async function(req: $Request, res: $Response) {

  const user = await UserLogic.getUserById(req.user.id)
  res.json(user)

})

module.exports = router
