'use strict';

import productController from './controller/productController';

module.exports = function (app: any) {
    app.use('/api/products', productController);
    // app.use('/user', require('./controller/userController'));
};
