import * as React from 'react';
import * as classes from './products.scss';
import { NavLink } from 'react-router-dom';
import {history} from 'src/store/store';
import Axios from 'axios';

class Products extends React.Component<any, any>{
    public constructor(props) {
        super(props);
        this.state = {
            response: []
        };
    }

    public componentDidMount() {
        this.callApi()
            .then(res => this.setState({ response: res }))
            .catch(err => console.log(err));
    }

    public render() {
        return (
            <>
                <div className="d-flex justify-content-between align-items-center">
                    <div className={classes.header}>Products page</div>
                    <NavLink className={classes.link} to="/addproduct">Add Product</NavLink>
                </div>
                {this.state.response.map((x: any, i) => {
                    return (
                        <div onClick={() => this.openProductView(x._id)} className={classes.box} key={x._id}>
                            name: <span className={classes.link}>{x.name}</span></div>
                    )
                }
                )}
            </>
        )
    }

    private openProductView = (id) => {
        history.push('product/' + id);
    }

    private callApi = async () => {
        const response = await Axios.get('/api/product');        ;

        if (response.status !== 200) {
            throw Error("Some error occured!!");
        }
        return response.data;
    };
}

export default Products;