"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressOpenapiZod = require("express-openapi-zod");

var _users = require("../controllers/users");

var _model = require("../model");

var _registry = require("../registry");

var _zod = require("../zod");

var router = (0, _expressOpenapiZod.OpenAPIRouter)(_registry.registry);
router.openapi({
  path: "/users",
  responses: {
    200: _zod.z.array(_model.User),
    500: _model.ErrorResponse
  }
}).get("", function (req, res) {
  res.json((0, _users.listUsers)());
});
router.openapi({
  path: "/users/{userId}",
  request: {
    params: _zod.z.object({
      userId: _zod.z.string().openapi({
        description: "Identity of user"
      })
    })
  },
  responses: {
    200: _model.User,
    400: _model.ValidationError,
    404: _model.ErrorResponse,
    500: _model.ErrorResponse
  }
}).get("", function (req, res) {
  var user = (0, _users.getUser)(req.params.userId);

  if (!user) {
    res.status(404).json({
      message: "We couldn't find the user you were looking for!"
    });
  }

  res.json(user);
});
router.openapi({
  path: "/users",
  request: {
    body: _zod.z.object({
      name: _zod.z.string()
    })
  },
  responses: {
    200: _model.User,
    400: _model.ValidationError,
    500: _model.ErrorResponse
  }
}).post("", function (req, res) {
  res.json((0, _users.createUser)(req.body));
});
router.openapi({
  path: "/users/{userId}",
  request: {
    params: _zod.z.object({
      userId: _zod.z.string().openapi({
        description: "Identity of user"
      })
    })
  },
  responses: {
    200: null,
    400: _model.ValidationError,
    500: _model.ErrorResponse
  }
})["delete"]("/:userId", function (req, res) {
  (0, _users.removeUser)(req.params.userId);
  res.sendStatus(200);
});
var _default = router.router;
exports["default"] = _default;
//# sourceMappingURL=users.js.map