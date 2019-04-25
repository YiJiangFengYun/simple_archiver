import * as log from 'log4js';
import * as logger from './logger';

export var inited: boolean;

export function init() {
    return new Promise<void>((resolve) => {
        if (inited) {
            return resolve();
        }
        inited = true;
        let defaultConfig = {
            appenders: {
                console: {type: 'console'},
            },
            categories: {
                default: {appenders: ['console'], level: 'debug'},
            },
        };
        log.configure(defaultConfig);
        logger.initLogger();
        resolve();
    });
}