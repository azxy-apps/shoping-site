import { Product } from "../model/productModel";

export class ProductService {

    public static async getAllProduct() {
        let products = null;
        console.log('product service: before find');

        products = await Product.find({});

        return products;
    }

    public static async addNewProduct(body: any) {
        const newProduct = new Product(body);
        const res = await newProduct.save();

        return res;
    }
}
