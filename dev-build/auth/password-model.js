'use strict';

var getAccessToken = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(bearerToken, callback) {
    var token, dbUser, user;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return AccessTokenLogic.getByAccessToken(bearerToken);

          case 2:
            token = _context.sent;


            if (token == null) callback(Error("Token not found"), null);

            _context.next = 6;
            return UserLogic.getUserById(token.userId);

          case 6:
            dbUser = _context.sent;
            user = {
              id: token.userId,
              username: dbUser.username,
              email: dbUser.email,
              isEmailConfirmed: dbUser.isEmailConfirmed,
              roles: dbUser.roles,
              grants: dbUser
            };


            callback(false, { expires: token.expires, user: user });

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function getAccessToken(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var getClient = function () {
  var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(clientId, clientSecret, callback) {
    var params, client;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            params = {
              clientId: clientId
            };


            if (clientSecret) params.clientSecret = clientSecret;

            _context2.next = 4;
            return ClientRepository.findByClientId(params.clientId);

          case 4:
            client = _context2.sent;

            if (client.clientSecret != clientSecret) callback(Error("ClientSecret doesn t match."), null);
            if (client == null) callback(Error("Client not found"), null);

            callback(false, {
              id: client.clientId,
              redirectUris: client.redirectUris,
              grants: client.grants,
              accessTokenLifetime: constants.ACCESS_TOKEN_LIFE_TIME,
              refreshTokenLifetime: null
            });

          case 8:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function getClient(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

var grantTypeAllowed = function () {
  var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(clientId, grantType, callback) {
    var client, result;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return ClientRepository.findByClientId(clientId);

          case 2:
            client = _context3.sent;
            result = client.grants.indexOf(grantType) != -1;

            callback(false, result);

          case 5:
          case 'end':
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));

  return function grantTypeAllowed(_x6, _x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}();

var getUser = function () {
  var _ref4 = _asyncToGenerator(regeneratorRuntime.mark(function _callee4(username, password, callback) {
    var myUser;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return UserLogic.getUser(username, password);

          case 2:
            myUser = _context4.sent;


            if (myUser != null) {
              callback(false, { id: myUser._id });
            } else {
              callback(Error("Invalid user credentials."), null);
            }

          case 4:
          case 'end':
            return _context4.stop();
        }
      }
    }, _callee4, this);
  }));

  return function getUser(_x9, _x10, _x11) {
    return _ref4.apply(this, arguments);
  };
}();

var saveAccessToken = function () {
  var _ref5 = _asyncToGenerator(regeneratorRuntime.mark(function _callee5(accessToken, clientId, expires, user, callback) {
    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return AccessTokenLogic.add(accessToken, clientId, expires, user.id);

          case 2:
            callback(false);

          case 3:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this);
  }));

  return function saveAccessToken(_x12, _x13, _x14, _x15, _x16) {
    return _ref5.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var ClientRepository = require('../commons/repositories/client-repository');
var UserLogic = require('../commons/logics/user-logic');
var AccessTokenLogic = require('../commons/logics/accessToken-logic');
var constants = require('../constants');
var refreshToken = require('./refresh-token.auth');

module.exports = {
  getAccessToken: getAccessToken,
  getClient: getClient,
  getUser: getUser,
  saveAccessToken: saveAccessToken,
  grantTypeAllowed: grantTypeAllowed,
  saveRefreshToken: refreshToken.saveRefreshToken,
  getRefreshToken: refreshToken.getRefreshToken
};