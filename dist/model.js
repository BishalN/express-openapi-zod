"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerModels = exports.ValidationError = exports.ErrorResponse = exports.PetWithOwner = exports.Pet = exports.User = void 0;

var _zod = require("./zod");

var User = _zod.z.object({
  id: _zod.z.string().openapi({
    example: "abc123"
  }),
  name: _zod.z.string().openapi({
    example: "Henry"
  })
});

exports.User = User;

var Pet = _zod.z.object({
  id: _zod.z.string().openapi({
    example: "abc123"
  }),
  name: _zod.z.string().openapi({
    example: "Mittens"
  }),
  age: _zod.z.optional(_zod.z.number()).openapi({
    example: 5
  }),
  ownerId: _zod.z.optional(_zod.z.string()).openapi({
    example: "Henry"
  })
});

exports.Pet = Pet;
var PetWithOwner = Pet.extend({
  owner: User
});
exports.PetWithOwner = PetWithOwner;

var ErrorResponse = _zod.z.object({
  message: _zod.z.string().openapi({
    example: "Something went wrong!"
  })
});

exports.ErrorResponse = ErrorResponse;
var ValidationError = ErrorResponse.extend({
  errors: _zod.z.array(_zod.z.object({
    path: _zod.z.string(),
    message: _zod.z.string(),
    errorCode: _zod.z.string()
  }))
});
exports.ValidationError = ValidationError;

var registerModels = function registerModels(registry) {
  registry.register("registry", ValidationError);
  registry.register("registry", ErrorResponse);
  registry.register("registry", User);
  registry.register("registry", Pet);
  registry.register("registry", PetWithOwner);
};

exports.registerModels = registerModels;
//# sourceMappingURL=model.js.map