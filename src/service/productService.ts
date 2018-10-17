import { Product } from "../model/productModel";

export class ProductService {

    public static async getAllProduct() {
        let products = null;
        console.log('product service: before find');
        try {
            products = await Product.find({});
            console.log('product service: after find: ', products);
        } catch (error) {
            console.log('product service error: ', error);
        }
        // close db connection
        return products;
    }

    public static async getProductById(id: any) {
        let products = null;
        console.log('product service: before finds');
        try {
            products = await Product.find({ _id: id });
            console.log('product service: after find: ', products);
        } catch (error) {
            console.log('product service error: ', error);
        }
        // close db connection
        return products;
    }

    public static async addNewProduct(body: any) {
        const newProduct = new Product(body);
        const res = await newProduct.save();
        // close db connection
        return res;
    }
    public static async updateProduct(body: any) {
        const res = await Product.updateOne({ _id: body._id }, { $set: body });
        // close db connection
        return res;
    }

    public static async deleteProduct(body: any) {
        let product = null;
        product = await Product.deleteOne({ _id: body._id }, { $set: body });
        // close db connection
        return product;
    }

    public static async deleteProducts(body: any) {
        let product = null;
        product = await Product.deleteMany({ _id: body._Query }, { $set: body });
        // close db connection
        return product;
    }
}
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

app.use('/api', router);
*/
