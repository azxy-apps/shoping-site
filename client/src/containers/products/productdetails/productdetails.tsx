import * as React from 'react';
import * as classes from './productdetails';
import { connect } from 'react-redux';
import axios from 'axios';
import { history } from 'src/store/store';

class ProductDetails extends React.Component<any, any>{
    public constructor(props) {
        super(props);
        this.state = {
            product: {}
        }
    }

    public render() {
        return (
            <>
                <div>{this.props.productId ? this.state.isEdit ? this.editRenderer() : this.productRenderer() : this.addProductRenderer()}</div>

            </>
        )
    }

    public componentDidMount() {
        if (this.props.productId) {
            this.getProductDetails();
        }
    }

    private addProductRenderer = () => {
        return (
            <>
                <div>Add Product</div>
                <div>name: <input value={this.state.product.name} onChange={this.nameChanged} /></div>
                <button onClick={this.addProductDetails}>Add</button>
                <button onClick={() => history.push('/products')}>Cancel</button>
            </>
        )
    }

    private editRenderer = () => {
        return (
            <>
                <div>Edit Product Details</div>
                <div>name: <input value={this.state.product.name} onChange={this.nameChanged} /></div>
                <button onClick={this.updateProductDetails}>Save</button>
                <button onClick={this.cancelEdit}>Cancel</button>
            </>
        )
    }

    private productRenderer = () => {
        return (
            <>
                <div>Product Details</div>
                <div>name: {this.state.product.name}</div>
                <button onClick={this.editProduct}>Edit</button>
                <button onClick={this.deleteProduct}>Delete</button>
            </>
        )
    }

    private nameChanged = (event) => {
        const product = { ...this.state.product, name: event.currentTarget.value };
        this.setState({ product });
    }

    private editProduct = () => {
        this.setState({ isEdit: true });
    }

    private cancelEdit = () => {
        this.setState({ isEdit: false });
    }

    private getProductDetails = async () => {
        const response = await axios.get('/api/product/' + this.props.productId);
        if (response.status !== 200) {
            throw Error("Some error occured!!");
        }
        this.setState({ product: response.data });
    }

    private addProductDetails = async () => {
        const response = await axios.post('/api/product', this.state.product);
        if (response.status !== 200) {
            throw Error("Some error occured!!");
        }
        history.push('/products');
    }

    private updateProductDetails = async () => {
        const response = await axios.put('/api/product/' + this.props.productId, this.state.product);
        if (response.status !== 200) {
            throw Error("Some error occured!!");
        }
        history.push('/products');
    }

    private deleteProduct = async () => {
        const response = await axios.delete('/api/product/' + this.props.productId);
        if (response.status !== 200) {
            throw Error("Some error occured!!");
        }
        history.push('/products');
    }
}

const mapStateToProps = (state) => {
    const path = state.router.location.pathname;
    let productId = null;
    if (path.indexOf('addproduct') || path.indexOf('editproduct')) {
        productId = path.split('/')[2];
    }

    return {
        productId
    };
}

const mapDispatchToProps = (dispatch) => {
    return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetails);