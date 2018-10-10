import * as React from 'react';
import * as classes from './layout.scss';

class Layout extends React.Component {

    constructor(props) {
        super(props);
    }

    public render() {
        return (
            <>
                <div className={classes.layout}>
                    This is layout
                </div>
                {this.props.children}
            </>
        );
    }
}

export default Layout;
