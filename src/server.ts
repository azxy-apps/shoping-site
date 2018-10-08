import express from "express";
import debug from "debug";
import morgan from "morgan";
import chalk from "chalk";
import path from "path";

const app = express();
const port: any = process.env.PORT || 5000;

app.use(morgan('tiny'));

app.get('/api/hello', (req, res) => {
    res.send({ express: 'Hello From Express of Shoping site, auto deployment enabled. Changed' });
});

if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, '/../client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '/../client/build', 'index.html'));
    });
}

app.listen(port, () => debug(`Listening  on port ${chalk.green(port)}`));