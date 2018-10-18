import chalk from "chalk";

import config from "./config";
import app from "./app";
import logger from './helper/logger';

const port: any = config.api.port;

// server is instance is created
app.listen(port, () => console.log(`Listening  on port ${chalk.green(port)}`));

logger.info(`Listening to ${app.get('config').api.host} on ${app.get('config').api.port}`);
