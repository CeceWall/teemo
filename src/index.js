import React from 'react';
import ReactDOM from 'react-dom';
import FastClick from 'fastclick';
import {applyMiddleware, createStore} from 'redux';
import promiseMiddleware from 'redux-promise';
import {Provider} from 'react-redux';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './index.css';
import Home from './components/Home'
import FastPrice from '@/FastPrice'
import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';

require("font-awesome-webpack");

/**
 * FastClick初始化
 */
if ('addEventListener' in document) {
    document.addEventListener('DOMContentLoaded', function () {
        FastClick.attach(document.body);
    }, false);
}

const store = createStore(
    reducers,
    applyMiddleware(
        promiseMiddleware,
    ),
);

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <div>
                <Route exact path="/" component={Home}/>
                <Route path="/fast-price" component={FastPrice}/>
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
);
registerServiceWorker();
