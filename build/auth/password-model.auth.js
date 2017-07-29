"use strict";

function getAccessToken(bearerToken, callback) {
  console.log("Auth method: getAccessToken");
  callback(null, { date: null, user: { user_id: 12 } });
}

function getClient(clientId, clientSecret, callback) {
  console.log("Auth method: getClient");
  /*const options = {
    where: {client_id: clientId},
    attributes: ['id', 'client_id', 'redirect_uri', 'scope'],
  };
  if (clientSecret) options.where.client_secret = clientSecret;
   return sqldb.OAuthClient
    .findOne(options)
    .then(function (client) {
      if (!client) return new Error("client not found");
      var clientWithGrants = client.toJSON()
      clientWithGrants.grants = ['authorization_code', 'password', 'refresh_token', 'client_credentials']
      // Todo: need to create another table for redirect URIs
      clientWithGrants.redirectUris = [clientWithGrants.redirect_uri]
      delete clientWithGrants.redirect_uri
      //clientWithGrants.refreshTokenLifetime = integer optional
      //clientWithGrants.accessTokenLifetime  = integer optional
      return clientWithGrants
    }).catch(function (err) {
      console.log("getClient - Err: ", err)
    });*/
}

function getUser(username, password, callback) {
  console.log("Auth method: getUser");
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

function revokeRefreshToken(refreshToken, callback) {
  console.log("Auth method: revokeRefreshToken");
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

function saveAccessToken(accessToken, clientId, expires, user, callback) {
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

function getUserFromClient(clientId, clientSecret, callback) {
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

function getRefreshToken(refreshToken, callback) {
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
  saveAccessToken: saveAccessToken
};