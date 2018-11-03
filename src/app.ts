import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import addReqId from "express-request-id";
import _ from "lodash";
// import passport from "passport";

import logger from "./helper/logger";
import config from "./config";
import router from "./route";
import errorHandler from "./helper/errorhandler";
import passportSetup from "./config/passport-setup";

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

        passportSetup();
        // to add unique-ids to requests
        this.app.use(addReqId());

        this.app.use(morgan('tiny'));

        // set ENV config
        this.app.set('config', config);

        // Log common fields
        this.app.use((req: any, res, next) => {
            logger.set(req);
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

        // create response structure
        this.app.use((req: any, res: any, next) => {
            res.api = {
                requestId: req.id,
                status: null,
                isSuccessful: false,
                error: null,
                result: null,
            };
            res.setStatus = (isSuccessful, statusCode) => {
                res.api.isSuccessful = isSuccessful;
                res.api.status = statusCode;
                res.status(statusCode);
            };

            next();
        });

        // set router for application
        router(this.app);

        // to handle errors
        errorHandler(this.app);
    }
}

const app = new App().app;

export default app;
