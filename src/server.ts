import chalk from "chalk";

import config from "./config";
import app from "./app";

const port: any = config.api.port;

// server is instance is created
app.listen(port, () => console.log(`Listening  on port ${chalk.green(port)}`));

app.get('log').info(
    'Listening on %s:%s',
    app.get('config').api.host,
    app.get('config').api.port,
);
