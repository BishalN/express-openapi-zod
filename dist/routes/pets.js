"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressOpenapiZod = require("express-openapi-zod");

var _pets = require("../controllers/pets");

var _model = require("../model");

var _registry = require("../registry");

var _zod = require("../zod");

var router = (0, _expressOpenapiZod.OpenAPIRouter)(_registry.registry);
router.openapi({
  path: "/pets",
  request: {
    query: _zod.z.object({
      ownerId: _zod.z.optional(_zod.z.string()).openapi({
        description: "Pets belonging to person."
      }),
      withOwner: _zod.z.optional(_zod.z["boolean"]()).openapi({
        description: "Return the full details of the owner.",
        example: false
      })
    })
  },
  responses: {
    // Array of Pet or PetWithOwner
    200: _zod.z.array(_zod.z.union([_model.Pet, _model.PetWithOwner]))
  }
}).get("", function (req, res) {
  res.json((0, _pets.listPets)().filter(function (pet) {
    return !req.query.ownerId || pet.ownerId === req.query.ownerId;
  }).map(function (pet) {
    return req.query.withOwner ? (0, _pets.withOwner)(pet) : pet;
  }));
});
router.openapi({
  path: "/pets/{petId}",
  request: {
    params: _zod.z.object({
      petId: _zod.z.string().openapi({
        description: "Identity of pet"
      })
    }),
    query: _zod.z.object({
      withOwner: _zod.z.optional(_zod.z["boolean"]()).openapi({
        description: "Return the full details of the owner.",
        example: false
      })
    })
  },
  responses: {
    200: [_model.Pet, _model.PetWithOwner],
    400: _model.ValidationError,
    404: _zod.z.object({
      message: _zod.z.string().openapi({
        example: "Couldn't find it!"
      })
    }),
    500: _model.ErrorResponse
  }
}).get("", function (req, res) {
  var pet = (0, _pets.getPet)(req.params.petId);

  if (!pet) {
    res.status(404).json({
      message: "We couldn't find the pet you were looking for!"
    });
  }

  res.json(pet);
});
router.openapi({
  path: "/pets",
  request: {
    body: {
      description: "Details of pet to create",
      schema: _zod.z.object({
        name: _zod.z.string(),
        age: _zod.z.number(),
        ownerId: _zod.z.string()
      })
    }
  },
  responses: {
    200: _model.Pet,
    400: _model.ValidationError,
    500: _model.ErrorResponse
  }
}).post("", function (req, res) {
  res.json((0, _pets.createPet)(req.body));
});
router.openapi({
  path: "/pets/{petId}",
  request: {
    params: _zod.z.object({
      petId: _zod.z.string().openapi({
        description: "Identity of pet"
      })
    })
  },
  responses: {
    200: null,
    400: _model.ValidationError,
    500: _model.ErrorResponse
  }
})["delete"]("/:petId", function (req, res) {
  (0, _pets.removePet)(req.params.petId);
  res.sendStatus(200);
});
var _default = router.router;
exports["default"] = _default;
//# sourceMappingURL=pets.js.map