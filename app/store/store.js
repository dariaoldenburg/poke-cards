import { applyMiddleware, compose, createStore } from 'redux';
import multi from 'redux-multi';
import thunk from 'redux-thunk';
import { createBrowserHistory } from 'history';

import {
  rootReducer,
} from './root';


const history = createBrowserHistory();

const middlewares = [
  multi,
  thunk,
];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  {},
  composeEnhancers(applyMiddleware(...middlewares)),
);

export {
  store,
  history,
};
