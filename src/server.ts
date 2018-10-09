import express from "express";
import debug from "debug";
import morgan from "morgan";
import chalk from "chalk";
import path from "path";

// temp testing
import { MongoClient } from "mongodb";

const app = express();
const port: any = process.env.PORT || 5000;

app.use(morgan('tiny'));


app.get('/api/product', (req, res) => {
    const url = "mongodb://admin:Shopingsite123@ds027748.mlab.com:27748/shoping-site";
    console.log('product');
    (async () => {
        let client;
        try {
            client = await MongoClient.connect(url);
            console.log("connected to mongo");
            const db = client.db("shoping-site");
            const response = await db.collection("product").find().toArray();
            res.json(response);
        } catch (err) {
            res.send("error:" + JSON.stringify(err));
        }
    })();
});

app.get('/api/putproduct', (req, res) => {
    const url = "mongodb://admin:Shopingsite123@ds027748.mlab.com:27748/shoping-site";
    console.log('product');
    (async () => {
        let client;
        try {
            client = await MongoClient.connect(url);
            console.log("connected to mongo");
            const db = client.db("shoping-site");
            const response = await db.collection("product").insertOne({ name: 'product-' + (Math.random() * 100) });
            res.json(response);
        } catch (err) {
            res.send("error:" + JSON.stringify(err));
        }
    })();
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