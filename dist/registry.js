"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registry = exports.getOpenAPISpec = void 0;

var _zodToOpenapi = require("@asteasolutions/zod-to-openapi");

var _model = require("./model");

var registry = new _zodToOpenapi.OpenAPIRegistry();
exports.registry = registry;
(0, _model.registerModels)(registry);
var openApiSpec;

var getOpenAPISpec = function getOpenAPISpec() {
  if (!openApiSpec) openApiSpec = new _zodToOpenapi.OpenApiGeneratorV3(registry.definitions).generateDocument({
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "My API"
    }
  });
  return openApiSpec;
};

exports.getOpenAPISpec = getOpenAPISpec;
//# sourceMappingURL=registry.js.map