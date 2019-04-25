"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var log4js = require("log4js");
function initLogger() {
    exports.log = exports.logger = log4js.getLogger();
}
exports.initLogger = initLogger;
//# sourceMappingURL=logger.js.map