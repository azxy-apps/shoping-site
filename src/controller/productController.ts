import express from "express";
import _ from "lodash";

import { ProductService } from "../service";
import commonValidatorRouter from "../helper/commonValidator";
import logger from '../helper/logger';

const productRouter = express.Router();

/*
*   This GET API to get the list of available products
*/
productRouter.get('/', commonValidatorRouter)
    .get('/', async (req, res: any, next) => {
        // validate the req

        // Call service method
        try {
            res.api.result = await ProductService.getAllProduct();

            logger.info("Product details are fetched successfully");

            res.setStatus(true, 200);
            return res.json(res.api);

        } catch (error) {
            next(error);
        }
    })

    /*
    *   This GET API to get the product by id
    */
    .get('/:id', async (req, res: any, next) => {
        // Call service method
        try {
            res.api.result = await ProductService.getProductById(req.params.id);

            res.setStatus(true, 200);
            return res.json(res.api);

        } catch (error) {
            next(error);
        }
    });

/*
*   This POST API to add the products
*/
productRouter.post('/', commonValidatorRouter)
    .post('/', async (req, res: any, next) => {
        // Call service method

        try {
            res.api.result = await ProductService.addNewProduct(req.body);

            res.setStatus(true, 200);
            return res.json(res.api);

        } catch (error) {
            next(error);
        }
    });

/*
*   This PUT API to save the products
*/
productRouter.put('/', commonValidatorRouter)
    .put('/', async (req, res: any, next) => {
        try {
            res.api.result = await ProductService.updateProduct(req.body);

            res.setStatus(true, 200);
            return res.json(res.api);

        } catch (error) {
            next(error);
        }
    });

/*
*   This DELETE API to remove the products
*/
productRouter.delete('/', commonValidatorRouter)
    .delete('/:id', async (req, res: any, next) => {
        // Call service method
        try {
            res.api.result = await ProductService.deleteProduct({ _id: req.params.id });

            res.setStatus(true, 200);
            return res.json(res.api);
        } catch (error) {
            next(error);
        }
    })
    .delete('/', async (req, res: any, next) => {
        // Call service method
        try {
            res.api.result = await ProductService.deleteProducts(req.body);

            res.setStatus(true, 200);
            return res.json(res.api);

        } catch (error) {
            next(error);
        }
    });

export default productRouter;
