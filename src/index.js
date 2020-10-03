import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

//UI Design
import 'antd/dist/antd.css';

//redux
import configStore from './store/configStore';
import { Provider } from 'react-redux';
import Layout from './layout';

const store = configStore();

ReactDOM.render(
  <Provider store={store}>
    <Layout>
      <App />
    </Layout>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
