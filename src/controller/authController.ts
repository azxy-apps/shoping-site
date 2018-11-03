
import express from "express";
import passport from "passport";
import _ from "lodash";

import commonValidatorRouter from "../helper/commonValidator";
import logger from '../helper/logger';

const router = express.Router();


/*
*   Login
*/
router.get('/login', async (req, res: any, next) => {
    res.send('login requested');


});

/*
*   Logout
*/
router.get('/logout', async (req, res: any, next) => {

    res.send('logout requested');


});

/*
*   google
*/
router.get('/google', passport.authenticate('google', {
    scope:['profile']
}));




/*
*   Google redirect
*/
router.get('/google/redirect', passport.authenticate('google') ,async (req, res: any, next) => {

    console.log("12345678")
    res.send('google redirect');


});


export default router;
