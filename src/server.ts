import express from "express";
import debug from "debug";
import morgan from "morgan";
import chalk from "chalk";

const app = express();
const port: any = process.env.PORT || 5000;

app.use(morgan('tiny'));

app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express of Shoping site' });
});

app.listen(port, () => debug(`Listening  on port ${chalk.green(port)}`));