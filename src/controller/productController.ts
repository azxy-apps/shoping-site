import express from "express";
import { ProductService } from "../service";
import commonValidatorRouter from "../helper/commonValidator";
const productRouter = express.Router();
/*
*   This GET API to get the available products
*/
productRouter.get('/', commonValidatorRouter)
    .get('/', async (req, res) => {
        // Call service method
        const response = await ProductService.getAllProduct();
        return res.json(response);
    })
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
        return response;
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
