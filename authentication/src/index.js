import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import {Provider} from 'react-redux'
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'

import {reducers} from './redux/reducers'

const store=createStore(reducers, compose(applyMiddleware(thunk)))
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
