"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _express = _interopRequireWildcard(require("express"));

var OpenApiValidator = _interopRequireWildcard(require("express-openapi-validator"));

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _pets = _interopRequireDefault(require("./routes/pets"));

var _users = _interopRequireDefault(require("./routes/users"));

var _schema = _interopRequireDefault(require("./routes/schema"));

var _registry = require("./registry");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var app = (0, _express["default"])();
app.use((0, _express.json)()); // Generate the openapi schema (must come after import of routers)

var openapiSchema = (0, _registry.getOpenAPISpec)(); // Serve openapi spec as Swagger documentation

app.use("/", _swaggerUiExpress["default"].serve, _swaggerUiExpress["default"].setup(openapiSchema)); // Use openapi spec to validate requests/responses

app.use(OpenApiValidator.middleware({
  apiSpec: openapiSchema,
  validateRequests: true,
  validateResponses: true
}), function (err, req, res, next) {
  // format validation errors
  res.status(err.status || 500).json({
    message: err.message,
    errors: err.errors
  });
}); // Application routes

app.use("/users", _users["default"]);
app.use("/pets", _pets["default"]);
app.use("/schema", _schema["default"]);
app.listen(3000, function () {
  console.log("\uD83D\uDE80 Server ready at: http://localhost:3000");
});
//# sourceMappingURL=index.js.map