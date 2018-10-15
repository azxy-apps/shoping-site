import * as React from 'react';
import * as ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from 'react-redux';
import { store, persistor, history } from 'src/store/store';
import { PersistGate } from 'redux-persist/integration/react';
import { ConnectedRouter } from 'react-router-redux';
import axios from 'axios';

import "!style-loader!css-loader!../node_modules/bootstrap/dist/css/bootstrap-reboot.min.css";
import "!style-loader!css-loader!../node_modules/bootstrap/dist/css/bootstrap.css";
import "!style-loader!css-loader!../node_modules/font-awesome/css/font-awesome.css";
import "!style-loader!css-loader!sass-loader!src/assets/styles/global.scss";

import App from './containers/app/app';

axios.defaults.baseURL = 'http://localhost:5000';

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById('root') as HTMLElement
);

registerServiceWorker();
