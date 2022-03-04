/**
 *  假装这是远程加载代码
 */

export const remoteString = `
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _components = require("@tarojs/components");

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

var RemotePage = function RemotePage() {
  return /*#__PURE__*/ _react.default.createElement(
    _components.View,
    null,
    "This is RemotePage"
  );
};

var _default = RemotePage;
exports.default = _default;

`
