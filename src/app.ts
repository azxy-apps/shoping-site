import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import mongoose from "mongoose";

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

        this.app.use(morgan('tiny'));

        // set ENV config
        this.app.set('config', config);

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

        // set router for application
        require("./route")(this.app);

    }
}

export default new App().app;
