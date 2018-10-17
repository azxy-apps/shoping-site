import express from "express";

const commonValidator = express.Router();

commonValidator.use( async (req, res,  next) => {
    // do the common validator here
    console.log('Using common validator');
    next();
});

export default commonValidator;
