"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var log = require("log4js");
var logger = require("./logger");
function init() {
    return new Promise(function (resolve) {
        if (exports.inited) {
            return resolve();
        }
        exports.inited = true;
        var defaultConfig = {
            appenders: {
                console: { type: 'console' },
            },
            categories: {
                default: { appenders: ['console'], level: 'debug' },
            },
        };
        log.configure(defaultConfig);
        logger.initLogger();
        resolve();
    });
}
exports.init = init;
