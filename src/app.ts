import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import addReqId from "express-request-id";
import _ from "lodash";

import logger from "./helper/logger";
import config from "./config";

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
        this.config();
        this.mongoSetup();
    }

    private mongoSetup(): void {
        mongoose.Promise = global.Promise;
        console.log('Connecting :', config.db.mongodb.host);
        mongoose.connect(config.db.mongodb.host);
        console.log('Connected :', config.db.mongodb.host);
    }

    private config() {

        // to add unique-ids to requests
        this.app.use(addReqId());

        this.app.use(morgan('tiny'));

        // set ENV config
        this.app.set('config', config);

        // add logger
        this.app.set('log', logger);

        // Log common fields
        this.app.use((req: any, res, next) => {
            req.app.set('logEntry', {
                'serviceName': config.appname,
                'method': req.method,
                'request': req.originalUrl,
                'query': req.query,
                'protocol': req.protocol,
                'ip': req.ip,
                'requestId': req.id,
            });

            next();
        });

        // this will let us get the data from a POST
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());

        // Add headers
        this.app.use((req, res, next) => {

            // Website you wish to allow to connect
            res.setHeader('Access-Control-Allow-Origin', '*');

            // Request methods you wish to allow
            res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

            // Request headers you wish to allow
            res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

            // Set to true if you need the website to include cookies in the requests sent
            // to the API (e.g. in case you use sessions)
            // res.setHeader('Access-Control-Allow-Credentials', true);

            // Pass to next layer of middleware
            next();
        });

        // create response
        this.app.use((req, res: any, next) => {
            res.api = {
                'status': 200,
                'errors': {},
                'data': [],
            };

            next();
        });

        // set router
        require("./route")(this.app);

        // handle 404
        this.app.use((req, res: any) => {
            res.api.status = 404;
            res.status(res.api.status);

            // setting appropriate error objects
            res.api.errors.code = 'endpoint';
            res.api.errors.message = 'API endpoint does not exist';

            req.app.get('log').warn(_.assignIn(req.app.get('logEntry'), {
                'message': 'API endpoint does not exist',
                'status': res.api.status,
            }));

            res.json(res.api);
        });

        // handle errors
        this.app.use((err, req, res, next) => {
            if (!err) {
                return next();
            }

            // catch invalid json in request body
            if (err instanceof SyntaxError && 'body' in err) {

                res.api.status = 400;
                res.status(res.api.status);

                // setting appropriate error objects
                res.api.errors.code = 'body';
                res.api.errors.message = 'Invalid input';

                req.app.get('log').warn(_.assignIn(req.app.get('logEntry'), {
                    'message': 'Invalid input',
                    'status': res.api.status,
                    'error': err,
                }));

                return res.json(res.api);
            }

            // setting appropriate error objects
            res.api.errors.code = 'endpoint';
            res.api.errors.message = 'Oops something broke!';

            res.api.status = 500;
            res.status(res.api.status);

            req.app.get('log').error(_.assignIn(req.app.get('logEntry'), {
                'message': 'Internal server error',
                'status': res.api.status,
                'error': err,
                'stack': err.stack,
            }));

            res.json(res.api);
        });

    }
}

const app = new App().app;

export default app;
