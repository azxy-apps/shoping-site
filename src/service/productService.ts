import { Product } from "../model/productModel";

export class ProductService {

    public static async getAllProduct() {
        const products = await Product.find({});

        return products;
    }

    public static async addNewProduct(body: any) {
        const newProduct = new Product(body);
        const res = await newProduct.save();

        return res;
    }
}
