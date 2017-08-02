// @flow

const ClientRepository = require('../commons/repositories/client-repository')
const UserRepository = require('../commons/repositories/user-repository')

type AccessToken = {
  date: any, 
  user: mixed,
}

type ClientObj = {
  id: string, 
  redirectUris: ?string[], 
  grants: string[], 
  accessTokenLifetime: ?number, 
  refreshTokenLifetime: ?number
}

type UserObj = {
  id: number|string
}


function getAccessToken(bearerToken: string, callback: (err:mixed, accessToken: AccessToken) => any) {
  console.log("Auth method: getAccessToken"); 
  callback(null, { date: null, user: { user_id: 12 }} )
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
    accessTokenLifetime: null, 
    refreshTokenLifetime: null
  });
}

async function grantTypeAllowed (clientId:string, grantType:string, callback: (err:mixed, client: boolean) => any) {
  const client = await ClientRepository.findByClientId(clientId)
  const result = client.grants.indexOf(grantType) != -1
  callback(false, result)
}


async function getUser(username:string, password: string, callback: (err:mixed, user: UserObj) => any) {
  const user = await UserRepository.findByUsername(username)
  console.log(user)
  /*return User
    .findOne({
      where: {username: username},
      attributes: ['id', 'username', 'password', 'scope'],
    })
    .then(function (user) {
      return user.password == password ? user.toJSON() : false;
    })
    .catch(function (err) {
      console.log("getUser - Err: ", err)
    });*/
}

function revokeRefreshToken(refreshToken: any, callback: any) {
  console.log("Auth method: revokeRefreshToken")
  /*
  return OAuthRefreshToken.findOne({
    where: {
      refresh_token: token.refreshToken
    }
  }).then(function (rT) {
    if (rT) rT.destroy();
    /***
     * As per the discussion we need set older date
     * revokeToken will expected return a boolean in future version
     * https://github.com/oauthjs/node-oauth2-server/pull/274
     * https://github.com/oauthjs/node-oauth2-server/issues/290
     
    var expiredToken = token
    expiredToken.refreshTokenExpiresAt = new Date('2015-05-28T06:59:53.000Z')
    return expiredToken
  }).catch(function (err) {
    console.log("revokeToken - Err: ", err)
  });
  */
}


function saveAccessToken(accessToken: string, clientId: string, expires: any, user:any, callback:any) {
  console.log("Auth method: save access token"); 
  /*return Promise.all([
      OAuthAccessToken.create({
        access_token: token.accessToken,
        expires: token.accessTokenExpiresAt,
        client_id: client.id,
        user_id: user.id,
        scope: token.scope
      }),
      token.refreshToken ? OAuthRefreshToken.create({ // no refresh token for client_credentials
        refresh_token: token.refreshToken,
        expires: token.refreshTokenExpiresAt,
        client_id: client.id,
        user_id: user.id,
        scope: token.scope
      }) : [],

    ])
    .then(function (resultsArray) {
      return _.assign(  // expected to return client and user, but not returning
        {
          client: client,
          user: user,
          access_token: token.accessToken, // proxy
          refresh_token: token.refreshToken, // proxy
        },
        token
      )
    })
    .catch(function (err) {
      console.log("revokeToken - Err: ", err)
    });*/
}


function getUserFromClient(clientId: string, clientSecret:string, callback: any) {
  console.log("Auth method: getUserFromClient"); 

  /*var options = {
    where: {client_id: client.client_id},
    include: [User],
    attributes: ['id', 'client_id', 'redirect_uri'],
  };
  if (client.client_secret) options.where.client_secret = client.client_secret;

  return OAuthClient
    .findOne(options)
    .then(function (client) {
      if (!client) return false;
      if (!client.User) return false;
      return client.User.toJSON();
    }).catch(function (err) {
      console.log("getUserFromClient - Err: ", err)
    });*/
}

function getRefreshToken(refreshToken: any, callback: any) {
  console.log("Auth method: getRefreshToken"); 
  /*if (!refreshToken || refreshToken === 'undefined') return false

  return OAuthRefreshToken
    .findOne({
      attributes: ['client_id', 'user_id', 'expires'],
      where: {refresh_token: refreshToken},
      include: [OAuthClient, User]

    })
    .then(function (savedRT) {
      var tokenTemp = {
        user: savedRT ? savedRT.User.toJSON() : {},
        client: savedRT ? savedRT.OAuthClient.toJSON() : {},
        refreshTokenExpiresAt: savedRT ? new Date(savedRT.expires) : null,
        refreshToken: refreshToken,
        refresh_token: refreshToken,
        scope: savedRT.scope
      };
      return tokenTemp;

    }).catch(function (err) {
      console.log("getRefreshToken - Err: ", err)
    });*/
}

module.exports = {
  //generateOAuthAccessToken, optional - used for jwt
  //generateAuthorizationCode, optional
  //generateOAuthRefreshToken, - optional
  getAccessToken: getAccessToken,
  getClient: getClient,
  getRefreshToken: getRefreshToken,
  getUser: getUser,
  getUserFromClient: getUserFromClient,
  revokeRefreshToken: revokeRefreshToken,
  saveAccessToken: saveAccessToken, 
  grantTypeAllowed: grantTypeAllowed, 

}
