'use strict';

import productController from './controller/productController';

module.exports = (app: any) => {
    app.use('/api/products', productController);
    // app.use('/user', require('./controller/userController'));
    app.use('/', (req, res) => {
        res.json('Site is running!');
    });
};
