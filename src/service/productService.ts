import { Product } from "../model/productModel";

export class productService {

    static async getAllProduct() {
        let products = await Product.find({});

        return products;
    }

    static async addNewProduct(body: any) {
        let newProduct = new Product(body);
        let res = await newProduct.save();

        return res;
    }
    
}


