import * as log4js from 'log4js';
export var logger:log4js.Logger;
export var log: log4js.Logger;
export function initLogger() {
    log = logger = log4js.getLogger();
}