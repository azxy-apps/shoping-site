/* This is used to create the schema for product.
* Other than below fields, no other will be inserted into db
*/

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export const productSchema = new Schema({
    name: {
        type: String,
    },
    imagePath: {
        type: String,
    },
    price: {
        type: String,

    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
    updatedDate: {
        type: Date,
        default: Date.now,
    },
});
