// @flow

const ClientRepository = require('../commons/repositories/client-repository')
const UserLogic = require('../commons/logics/user-logic')
const AccessTokenLogic = require('../commons/logics/accessToken-logic')
const constants = require('../constants')
const refreshToken= require('./refresh-token.auth')


async function getAccessToken(bearerToken: string, callback: (err:mixed, accessToken: ?AccessToken) => any) {
  const token = await AccessTokenLogic.getByAccessToken(bearerToken)

  if(token == null) callback(Error("Token not found"), null)

  const dbUser = await UserLogic.getUserById(token.userId)

  const user: RequestUser = {
    id: token.userId,
    username: dbUser.username, 
    email: dbUser.email,
    isEmailConfirmed: dbUser.isEmailConfirmed, 
    roles: dbUser.roles,
    grants: dbUser,
  }

  callback(false, { expires: token.expires, user: user})
}

async function getClient(clientId: string, clientSecret: ?string, callback: (err:mixed, client: ?ClientObj) => any)  {
  let params : any = {
    clientId: clientId
  }
 
  if (clientSecret) params.clientSecret = clientSecret;

  const client = await ClientRepository.findByClientId(params.clientId)
  if (client.clientSecret != clientSecret) callback(Error("ClientSecret doesn t match."), null)
  if (client == null) callback(Error("Client not found"), null)

  callback(false, {
    id: client.clientId, 
    redirectUris: client.redirectUris, 
    grants: client.grants, 
    accessTokenLifetime: constants.ACCESS_TOKEN_LIFE_TIME, 
    refreshTokenLifetime: null
  });
}

async function grantTypeAllowed (clientId:string, grantType:string, callback: (err:mixed, client: boolean) => any) {
  const client = await ClientRepository.findByClientId(clientId)
  const result = client.grants.indexOf(grantType) != -1
  callback(false, result)
}


async function getUser(username:string, password: string, callback: (err:mixed, user: ?any) => any) {
  const myUser = await UserLogic.getUser(username, password)
  
  if(myUser != null) {
    callback(false, { id: myUser._id })
  } else {
    callback(Error("Invalid user credentials."), null)
  }
}

async function saveAccessToken(accessToken: string, clientId: string, expires: Date, user: RequestUser, callback:any) {
  await AccessTokenLogic.add(accessToken, clientId, expires, user.id)
  callback(false)
}


module.exports = {
  getAccessToken: getAccessToken,
  getClient: getClient,
  getUser: getUser,
  saveAccessToken: saveAccessToken, 
  grantTypeAllowed: grantTypeAllowed, 
  saveRefreshToken: refreshToken.saveRefreshToken, 
  getRefreshToken: refreshToken.getRefreshToken,
}
