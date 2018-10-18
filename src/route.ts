
import productController from './controller/productController';

export default (app: any) => {
    app.use('/api/products', productController);
};
