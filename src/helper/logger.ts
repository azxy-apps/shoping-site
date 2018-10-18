import Logger from "bunyan";
import config from "../config";

const _logger = Logger.createLogger({
    name: config.appname,
    streams: [{
        stream: process.stdout,
        level: Logger.INFO,
    },
    {
        type: 'rotating-file',
        level: Logger.INFO,
        path: `${config.appname}.log`,
        period: '1d',   // daily rotation
        count: 5,        // keep 5 back copies
    },
    ],
    serializers: {
        req: Logger.stdSerializers.req,
        res: Logger.stdSerializers.res,
        err: Logger.stdSerializers.err,
    },
});

let defaultLog = {};

const logger = {
    set: (req) => {
        defaultLog = {
            'requestId': req.id,
            req,
        };
    },
    fatal: (msg, obj = {}) => {
        const logData = { ...defaultLog, ...obj };
        _logger.fatal(logData, msg);
    },
    error: (msg, obj = {}) => {
        const logData = { ...defaultLog, ...obj };
        _logger.error(logData, msg);
    },
    warn: (msg, obj = {}) => {
        const logData = { ...defaultLog, ...obj };
        _logger.warn(logData, msg);
    },
    info: (msg, obj = {}) => {
        const logData = { ...defaultLog, ...obj };
        _logger.info(logData, msg);
    },
    debug: (msg, obj = {}) => {
        const logData = { ...defaultLog, ...obj };
        _logger.debug(logData, msg);
    },
    trace: (msg, obj = {}) => {
        const logData = { ...defaultLog, ...obj };
        _logger.trace(logData, msg);
    },
};

export default logger;
