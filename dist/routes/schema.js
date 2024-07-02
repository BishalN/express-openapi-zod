"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _expressOpenapiZod = require("express-openapi-zod");

var _registry = require("../registry");

var router = (0, _expressOpenapiZod.OpenAPIRouter)(_registry.registry);
router.openapi({
  path: "/schema",
  responses: {
    200: {
      description: "The OpenAPI schema"
    }
  }
}).get("", function (req, res) {
  return res.json((0, _registry.getOpenAPISpec)());
});
var _default = router.router;
exports["default"] = _default;
//# sourceMappingURL=schema.js.map