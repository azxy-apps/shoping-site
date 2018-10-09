import express from "express";
import morgan from "morgan";

class App {
    public app: express.Application;

    constructor() {
        this.app = express();
    }

    private config() {
        this.app.use(morgan('tiny'));
    }
}

export default new App().app;