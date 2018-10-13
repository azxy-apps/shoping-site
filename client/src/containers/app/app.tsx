import * as React from 'react';

import Layout from 'src/containers/layout/layout';
import * as classes from './app.scss';
import Counter from 'src/components/counter';
import { Route } from 'react-router-dom';
import Products from '../products/products';
import ProductDetails from '../products/productdetails/productdetails';

class App extends React.Component {
  public state = {
    response: []
  };

  public render() {
    return (
      <>
        <Layout />
        <Route extact={true} path="/products" component={Products} />
        <Route extact={true} path="/product/:id" component={ProductDetails} />
        <Route extact={true} path="/editproduct/:id" component={ProductDetails} />
        <Route extact={true} path="/addproduct" component={ProductDetails} />
      </>
    );
  }
}

export default App;
