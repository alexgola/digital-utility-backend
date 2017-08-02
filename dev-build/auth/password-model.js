'use strict';

var getClient = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(clientId, clientSecret, callback) {
    var params, client;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            params = {
              clientId: clientId
            };


            if (clientSecret) params.clientSecret = clientSecret;

            _context.next = 4;
            return ClientRepository.findByClientId(params.clientId);

          case 4:
            client = _context.sent;

            if (client.clientSecret != clientSecret) callback(Error("ClientSecret doesn t match."), null);
            if (client == null) callback(Error("Client not found"), null);

            callback(false, {
              id: client.clientId,
              redirectUris: client.redirectUris,
              grants: client.grants,
              accessTokenLifetime: null,
              refreshTokenLifetime: null
            });

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getClient(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var grantTypeAllowed = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(clientId, grantType, callback) {
    var client, result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return ClientRepository.findByClientId(clientId);

          case 2:
            client = _context2.sent;
            result = client.grants.indexOf(grantType) != -1;

            callback(false, result);

          case 5:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function grantTypeAllowed(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

var getUser = function () {
  var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(username, password, callback) {
    var user;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return UserRepository.findByUsername(username);

          case 2:
            user = _context3.sent;

            console.log(user);
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

          case 4:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function getUser(_x7, _x8, _x9) {
    return _ref3.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var ClientRepository = require('../commons/repositories/client-repository');
var UserRepository = require('../commons/repositories/user-repository');

function getAccessToken(bearerToken, callback) {
  console.log("Auth method: getAccessToken");
  callback(null, { date: null, user: { user_id: 12 } });
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

function getUserFromClient(clientId, clientSecret, callback) {
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

function getRefreshToken(refreshToken, callback) {
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
  grantTypeAllowed: grantTypeAllowed

};