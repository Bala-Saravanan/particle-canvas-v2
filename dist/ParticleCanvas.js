"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ParticleCanvas;
var _particleCanvas = _interopRequireDefault(require("./particle-canvas"));
var _react = require("react");
require("./index.css");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function ParticleCanvas(_ref) {
  var children = _ref.children;
  var canvas = (0, _react.useRef)(null);
  (0, _react.useEffect)(function () {
    if (canvas.current) {
      var particleCanvas = new _particleCanvas["default"](canvas.current);
      particleCanvas.start();
    }
  }, []);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("canvas", {
    ref: canvas,
    style: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      pointerEvents: "none"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      zIndex: 1
    }
  }, children));
}