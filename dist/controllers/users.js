"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeUser = exports.listUsers = exports.getUser = exports.createUser = void 0;

var _uuid = require("uuid");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var users = {};

var createUser = function createUser(body) {
  var newUser = _objectSpread({}, body, {
    id: (0, _uuid.v4)()
  });

  users[newUser.id] = newUser;
  return newUser;
};

exports.createUser = createUser;

var getUser = function getUser(id) {
  return users[id];
};

exports.getUser = getUser;

var listUsers = function listUsers() {
  return Object.values(users);
};

exports.listUsers = listUsers;

var removeUser = function removeUser(id) {
  delete users[id];
};

exports.removeUser = removeUser;
//# sourceMappingURL=users.js.map