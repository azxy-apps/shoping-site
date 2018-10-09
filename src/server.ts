import debug from "debug";
import chalk from "chalk";
import path from "path";
import express from "express";
import { MongoClient } from "mongodb";

import app from "./app";

const port = process.env.PORT || 5000;
const url = "mongodb://admin:Shopingsite123@ds027748.mlab.com:27748/shoping-site";

let db, client;

/*
*   This GET API to get the list of available products 
*/
app.get('/api/product', async (req, res) => {
    console.log('Get products');
    try {
        client = await MongoClient.connect(url);
        console.log("connected to mongo");
        db = client.db("shoping-site");
        const response = await db.collection("product").find().toArray();
        res.json(response);
    } catch (err) {
        res.send("error:" + JSON.stringify(err));
    }
});

/*
*   This POST API to create a product 
*/
app.post('/api/product', async (req, res) => {
    console.log('Insert product');
    try {
        client = await MongoClient.connect(url);
        console.log("connected to mongo");
        db = client.db("shoping-site");
        const response = await db.collection("product").insertOne({ name: 'product-' + (Math.random() * 100) });
        res.json(response);
    } catch (err) {
        res.send("error:" + JSON.stringify(err));
    }
});


/*
*   PROD related 
*/
if (process.env.NODE_ENV === 'production') {
    // Serve any static files 
    app.use(express.static(path.join(__dirname, '/../client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '/../client/build', 'index.html'));
    });
}

app.listen(port, () => debug(`Listening  on port ${chalk.green(port)}`));