import express from "express";
import { productService } from "../service";
import commonValidator from "../helper/commonValidator";

const router = express.Router();

/*
*   This GET API to get the list of available products
*/
router.get('/', commonValidator)
    .get('/', async (req, res) => {
        // validate the req

        // Call service method
        let response = await productService.getAllProduct();
        return res.json(response);
    });

/*
*   This GET API to get the list of available products
*/
router.post('/', commonValidator)
    .post('/', async (req, res) => {
        // validate the req

        // Call service method
        let response = await productService.addNewProduct(req.body);

        return res.json(response);
    });

export default router;
