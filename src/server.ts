import debug from "debug";
import chalk from "chalk";
import path from "path";
import express from "express";
import { MongoClient, ObjectId } from "mongodb";

import app from "./app";

const port: any = process.env.PORT || 5000;
const url = "mongodb://admin:Shopingsite123@ds027748.mlab.com:27748/shoping-site";

/*
// middleware to use for all requests
router.use((req, res, next) => {
    // do logging
    console.log('Default router.');
    next(); // make sure we go to the next routes and don't stop here
});

router.route('/product')
    .get(async (req, res) => {
        console.log('Get products');
        console.log('abc --->', schema);
        try {
            client = await MongoClient.connect(url, { useNewUrlParser: true });
            console.log("connected to mongo");
            db = client.db("shoping-site");
            const response = await db.collection("product").find().toArray();
            res.json(response);
        } catch (err) {
            res.send("error:" + JSON.stringify(err));
        }
    })
    .post(async (req, res) => {
        console.log('Insert product');
        try {
            client = await MongoClient.connect(url, { useNewUrlParser: true });
            console.log("connected to mongo");
            db = client.db("shoping-site");
            const response = await db.collection("product").insertOne({ name: req.body.name });
            res.json(response);
        } catch (err) {
            res.send("error:" + JSON.stringify(err));
        }
    });

router.route('/product/:id')
    .get(async (req, res) => {
        console.log('Get product by id');
        try {
            client = await MongoClient.connect(url, { useNewUrlParser: true });
            console.log("connected to mongo");
            db = client.db("shoping-site");
            const response = await db.collection("product").findOne(new ObjectId(req.params.id));
            res.json(response);
        } catch (err) {
            res.send("error:" + JSON.stringify(err));
        }
    })
    .put(async (req, res) => {
        console.log('update product');
        try {
            client = await MongoClient.connect(url, { useNewUrlParser: true });
            console.log("connected to mongo");
            db = client.db("shoping-site");
            const response = await db.collection("product").updateOne({ '_id': new ObjectId(req.params.id) }, { $set: { name: req.body.name } });
            res.json(response);
        } catch (err) {
            res.send("error:" + JSON.stringify(err));
        }
    })
    .delete(async (req, res) => {
        console.log('delete product');
        try {
            client = await MongoClient.connect(url, { useNewUrlParser: true });
            console.log("connected to mongo");
            db = client.db("shoping-site");
            const response = await db.collection("product").deleteOne({'_id': new ObjectId(req.params.id)});
            res.json(response);
        } catch (err) {
            res.send("error:" + JSON.stringify(err));
        }
    });

app.use('/api', router); */

/*
*   PROD related
*/
if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, '/../client/build')));
    // Handle React routing, return all requests to React app
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '/../client/build', 'index.html'));
    });
}

app.listen(port, () => debug(`Listening  on port ${chalk.green(port)}`));
