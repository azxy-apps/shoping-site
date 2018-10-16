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

        return products;
    }

    public static async addNewProduct(body: any) {
        const newProduct = new Product(body);
        const res = await newProduct.save();

        return res;
    }
}
