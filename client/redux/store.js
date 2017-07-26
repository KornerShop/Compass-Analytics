import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers';

import initialState from './initialState';

export default (state = initialState) => {
  const store = createStore(
    rootReducer,
    state,
    composeWithDevTools(applyMiddleware(thunk)),
  );
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }
  return store;
};
