import express from "express";

const router = express.Router();

router.use( async (req, res,  next) => {
    // do the common validator here
    console.log('Using common validator');
    next();
});

export default router;