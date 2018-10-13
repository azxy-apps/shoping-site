import { COUNTER_INCREMENT, COUNTER_DECREMENT } from 'src/store/actions/counter';

const initialState = {
    count: 0,
    test: 'gopi'
};

export default (state = initialState, action: any) => {
    switch (action.type) {
        case COUNTER_INCREMENT:
            return {
                ...state,
                count: state.count + action.gopi
            };

        case COUNTER_DECREMENT:
            return {
                ...state,
                count: state.count - 1,
            };

        default:
            return state;
    }
};
