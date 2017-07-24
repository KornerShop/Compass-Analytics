import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const preloadedState = window.__PRELOADED_STATE__;

delete window.__PRELOADED_STATE__;

export default createStore(
  rootReducer,
  preloadedState,
  compose(applyMiddleware(thunk)),
);
