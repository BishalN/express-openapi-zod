"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withOwner = exports.removePet = exports.listPets = exports.getPet = exports.createPet = void 0;

var _uuid = require("uuid");

var _users = require("./users");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var pets = {};

var createPet = function createPet(body) {
  var newPet = _objectSpread({}, body, {
    id: (0, _uuid.v4)()
  });

  pets[newPet.id] = newPet;
  return newPet;
};

exports.createPet = createPet;

var getPet = function getPet(id) {
  return pets[id];
};

exports.getPet = getPet;

var listPets = function listPets() {
  return Object.values(pets);
};

exports.listPets = listPets;

var removePet = function removePet(id) {
  delete pets[id];
};

exports.removePet = removePet;

var withOwner = function withOwner(pet) {
  return pet.ownerId ? _objectSpread({}, pet, {
    owner: (0, _users.getUser)(pet.ownerId)
  }) : pet;
};

exports.withOwner = withOwner;
//# sourceMappingURL=pets.js.map