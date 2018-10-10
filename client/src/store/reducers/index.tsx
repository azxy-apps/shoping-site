import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import counter from './counter';

const persistCounter = {
    key: 'globalClient',
    storage: storageSession,
    // whitelist: ['counter']
};

const persistedCounterReducer = persistReducer(persistCounter, counter);

export default combineReducers({
    counter: persistedCounterReducer,
    form: formReducer
});
