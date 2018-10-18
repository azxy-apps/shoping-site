import express from "express";
import _ from "lodash";

import { ProductService } from "../service";
import commonValidatorRouter from "../helper/commonValidator";

const productRouter = express.Router();

/*
*   This GET API to get the list of available products
*/
productRouter.get('/', commonValidatorRouter)
    .get('/', async (req, res: any, next) => {
        let response;
        // validate the req

        // Call service method
        try {
            response = await ProductService.getAllProduct();

        } catch (error) {
            next(error);
        }

        res.api.status = 200;
        res.status(res.api.status);

        req.app.get('log').info(_.assignIn(req.app.get('logEntry'), {
            'status': res.api.status,
        }));

        return res.json(response);
    })

    /*
    *   This GET API to get the product by id
    */
    .get('/:id', async (req, res) => {
        // Call service method
        const response = await ProductService.getProductById(req.params.id);
        return res.json(response);
    });

/*
*   This POST API to add the products
*/
productRouter.post('/', commonValidatorRouter)
    .post('/', async (req, res) => {
        // Call service method
        const response = await ProductService.addNewProduct(req.body);
        return res.json(response);
    });

/*
*   This PUT API to save the products
*/
productRouter.put('/', commonValidatorRouter)
    .put('/', async (req, res) => {
        const response = await ProductService.updateProduct(req.body);
        return res.json(response);
    });

/*
*   This DELETE API to remove the products
*/
productRouter.delete('/', commonValidatorRouter)
    .delete('/:id', async (req, res) => {
        // Call service method
        const response = await ProductService.deleteProduct({ _id: req.params.id });
        return res.json(response);
    })
    .delete('/', async (req, res) => {
        // Call service method
        const response = await ProductService.deleteProducts(req.body);
        return res.json(response);
    });
export default productRouter;
