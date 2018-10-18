import express from "express";
import { ProductService } from "../service";
import commonValidator from "../helper/commonValidator";
import _ from "lodash";

const router = express.Router();

/*
*   This GET API to get the list of available products
*/
router.get('/', commonValidator)
    .get('/', async (req, res: any, next) => {

        let response;
        // validate the req

        // Call service method
        try {
            response = await ProductService.getAllProduct();

            res.api.status = 200;

            req.app.get('log').info(_.assignIn(req.app.get('logEntry'), {
                'message': 'product response success',
                'status': res.api.status,
            }));

        } catch (error) {

            res.api.status = 404;
            res.status(res.api.status);

            req.app.get('log').warn(_.assignIn(req.app.get('logEntry'), {
                'message': 'product service error',
                'status': res.api.status,
            }));
            next(error);
        }

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
