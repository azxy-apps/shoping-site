import * as React from 'react';
import * as classes from './layout.scss';
import Counter from 'src/components/counter';

class Layout extends React.Component {

    constructor(props) {
        super(props);
    }

    public render() {
        return (
            <>
                <div className={classes.layout}>
                    This is layout
                    <Counter/>
                </div>
            </>
        );
    }
}

export default Layout;
