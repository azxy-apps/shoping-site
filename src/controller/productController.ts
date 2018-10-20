import express from "express";
import _ from "lodash";

import { ProductService } from "../service";
import commonValidatorRouter from "../helper/commonValidator";
import logger from '../helper/logger';

/* testing email*/
import nodemailer from "nodemailer";
import xoauth2 from "xoauth2";

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        xoauth2: xoauth2.createXOAuth2Generator({
            user: 'kottara.developers@gmail.com',
            clientId: '911300546326-fc8ikb5sj8h5jciavqqkv0og27njeg7o.apps.googleusercontent.com',
            clientSecret: '_xxpT-Q58fVJN6PAGmFRIJAO',
            refreshToken: '1/O56QbbRPkmx2BP5dGFRA5L9DDELjutFMUynprU4lM-s',
            // pass: 'Pwcwelcome1'
        }),
    },
});

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//         user: 'kottara.developers@gmail.com',
//         pass: 'Pwcwelcome1'
//     }
// });

const mailOptions = {
    from: 'kottara.developers@gmail.com',
    to: 'shoping-site@googlegroups.com',
    subject: 'testing email from node.js 001',
    text: '03 configuration with oauth2 approach',
};

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
    })

    /*
    *   This GET API to get the product by id
    */
    .get('/emailTesting', async (req, res: any, next) => {
        // Call service method
        try {
            transporter.sendMail(mailOptions, async (err, info) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log('email sent:' + info.response);
                }
            });
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
