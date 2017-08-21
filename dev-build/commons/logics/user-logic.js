'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var models = require('../models/user-model');
var repository = require('../repositories/user-repository');

var cryptoHelper = require('../../helpers/crypto-helper');
var randomHelper = require('../../helpers/random-helper');
var constants = require("../../constants");
var mongoose = require('mongoose');

var doUserRegistration = function () {
    var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(req) {
        var salt, passwordEncrypt;
        return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        salt = randomHelper.randomString(constants.USER_PASSWORD_SALT_LENGHT);
                        passwordEncrypt = cryptoHelper.hash256(req.password + salt);

                        // create encrypted password

                        req.password = passwordEncrypt;
                        req.salt = salt;

                        _context.next = 6;
                        return repository.create(req);

                    case 6:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, undefined);
    }));

    return function doUserRegistration(_x) {
        return _ref.apply(this, arguments);
    };
}();

var getUser = function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(username, password) {
        var user, passwordEncrypt;
        return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        _context2.next = 2;
                        return repository.findByUsername(username);

                    case 2:
                        user = _context2.sent;

                        if (!(user == null)) {
                            _context2.next = 5;
                            break;
                        }

                        return _context2.abrupt('return', null);

                    case 5:
                        passwordEncrypt = cryptoHelper.hash256(password + user.salt);

                        if (!(user.password === passwordEncrypt)) {
                            _context2.next = 8;
                            break;
                        }

                        return _context2.abrupt('return', user);

                    case 8:
                        return _context2.abrupt('return', null);

                    case 9:
                    case 'end':
                        return _context2.stop();
                }
            }
        }, _callee2, undefined);
    }));

    return function getUser(_x2, _x3) {
        return _ref2.apply(this, arguments);
    };
}();

var getUserById = function () {
    var _ref3 = _asyncToGenerator(regeneratorRuntime.mark(function _callee3(userId) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        _context3.next = 2;
                        return repository.findSingle(userId);

                    case 2:
                        return _context3.abrupt('return', _context3.sent);

                    case 3:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function getUserById(_x4) {
        return _ref3.apply(this, arguments);
    };
}();

module.exports = {
    doUserRegistration: doUserRegistration,
    getUser: getUser,
    getUserById: getUserById
};