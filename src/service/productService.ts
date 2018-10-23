import { Product } from "../model/productModel";

export class ProductService {

    public static async getAllProduct() {
        let products = null;

        products = await Product.find({});

        return products;
    }

    public static async getProductById(id: any) {
        let product = null;
        console.log('product service: before finds');
        try {
            const products = await Product.find({ _id: id });
            if (products && products.length > 0) {
                product = products[0];
            }
            console.log('product service: after find: ', products);
        } catch (error) {
            console.log('product service error: ', error);
            throw(error);
        }
        // close db connection
        return product;
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
        product = await Product.deleteOne({ _id: body._id });
        // close db connection
        return product;
    }

    public static async deleteProducts(body: any) {
        let product = null;
        product = await Product.deleteMany({ _id: body._Query });
        // close db connection
        return product;
    }
}
