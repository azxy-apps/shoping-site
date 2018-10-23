
import productController from './controller/productController';
import fileController from './controller/fileController';

export default (app: any) => {
    app.use('/api/products', productController);
    app.use('/api/files', fileController);
};
