"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Logging = /** @class */ (function () {
    function Logging() {
    }
    Logging.info = function (args) {
        return console.log('\x1b[36m%s\x1b[0m', "".concat(new Date().toLocaleString(), " [INFO] "), args);
    };
    Logging.warn = function (args) {
        return console.log('\x1b[33m%s\x1b[0m', "".concat(new Date().toLocaleString(), " [WARN] "), args);
    };
    Logging.error = function (args) {
        return console.error('\x1b[31m', "".concat(new Date().toLocaleString(), " [ERROR] "), args);
    };
    return Logging;
}());
exports.default = Logging;
