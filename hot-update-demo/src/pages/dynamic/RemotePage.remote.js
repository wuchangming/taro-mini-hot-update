
/**
 *  假装这是远程加载代码
 */

export const remoteString = `"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _components = require("@tarojs/components");

var RemotePage = function RemotePage() {
  return /*#__PURE__*/ React.createElement(
    _components.View,
    null,
    "This is RemotePage Remote"
  );
};

var _default = RemotePage;
exports.default = _default;
`
