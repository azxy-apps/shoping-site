import { productSchema } from "../schema";
import mongoose from "mongoose";

const Product: any = mongoose.model('product', productSchema);

export {
    Product,
};
