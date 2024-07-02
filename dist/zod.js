"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "z", {
  enumerable: true,
  get: function get() {
    return _zod["default"];
  }
});

var _zod = _interopRequireDefault(require("./zod"));

var _zodToOpenapi = require("@asteasolutions/zod-to-openapi");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

(0, _zodToOpenapi.extendZodWithOpenApi)(_zod["default"]);
//# sourceMappingURL=zod.js.map