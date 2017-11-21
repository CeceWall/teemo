/* eslint-env browser */
import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';
import { applyMiddleware, createStore, compose } from 'redux';
import ReduxThunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import FastPrice from '@/FastPrice';
import Home from '@/Home';
import GoodNews from '@/GoodNews';

import './index.css';
import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';

require('font-awesome-webpack');

/**
 * FastClick初始化
 */
if ('addEventListener' in document) {
  document.addEventListener('DOMContentLoaded', () => {
    FastClick.attach(document.body);
  }, false);
}
/* eslint-disable no-underscore-dangle */
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(ReduxThunk)),
);
/* eslint-enable */
ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div>
        <Route exact path="/" component={Home} />
        <Route path="/fast-price" component={FastPrice} />
        <Route path="/news/:id" component={GoodNews} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
