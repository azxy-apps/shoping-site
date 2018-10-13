import * as React from "react";
import { connect } from 'react-redux';
import { COUNTER_INCREMENT } from '../store/actions/counter';

const Counter = (props) => {
    return (
        <div onClick={props.updateCount}>{props.name} Counter {props.count}</div>
    );
}

const mapStateToProps = (state) => {
    return {
        count: state.counter.count,
        name: state.counter.test,
    };
}

const mapDistachToProps = (dispatch) => {
    return {
        updateCount: () => {
            dispatch({type: COUNTER_INCREMENT, gopi: 34})
        }
    };
}

export default connect(mapStateToProps, mapDistachToProps)(Counter);