/*jshint esversion:6*/
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import App from './container/App';

const store = configureStore();
const app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>, app);
