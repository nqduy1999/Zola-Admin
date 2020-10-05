import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ToastContainer } from 'react-toastify';

//UI Design
import 'antd/dist/antd.css';
import 'react-toastify/dist/ReactToastify.css';

//redux
import configStore from './store/configStore';
import { Provider } from 'react-redux';

const store = configStore();

ReactDOM.render(
  <Provider store={store}>
    <App />
    <ToastContainer />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
