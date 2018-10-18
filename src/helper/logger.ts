import Logger from "bunyan";
import config from "../config";

export default Logger.createLogger({
    name: config.appname,
    streams: [{
        stream: process.stdout,
        level: Logger.TRACE,
    }, {
        level: Logger.TRACE,
        path: `${config.appname}.log`,
    },
    ],
    serializers: {
        req: Logger.stdSerializers.req,
        res: Logger.stdSerializers.res,
    },
});
