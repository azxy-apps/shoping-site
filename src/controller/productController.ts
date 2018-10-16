import express from "express";
import { ProductService } from "../service";
import commonValidator from "../helper/commonValidator";

const router = express.Router();

/*
*   This GET API to get the list of available products
*/
router.get('/', commonValidator)
    .get('/', async (req, res) => {
        // validate the req
        console.log('product controller: before call');

        // Call service method
        const response = await ProductService.getAllProduct();
        console.log('product controller: after call: ', response);

        return res.json(response);
    });

/*
*   This GET API to get the list of available products
*/
router.post('/', commonValidator)
    .post('/', async (req, res) => {
        // validate the req

        // Call service method
        const response = await ProductService.addNewProduct(req.body);

        return res.json(response);
    });

export default router;
