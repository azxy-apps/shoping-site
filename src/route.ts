
import productController from './controller/productController';
import authController from './controller/authController';

export default (app: any) => {
    app.use('/api/products', productController);
    app.use('/auth', authController);
};
