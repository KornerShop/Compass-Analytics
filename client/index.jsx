/* eslint-disable global-require */

import React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer as HotContainer } from 'react-hot-loader';

import configureStore from './redux/store';

import App from './components/App';

const preloadedState = window.__PRELOADED_STATE__;

delete window.__PRELOADED_STATE__;

const store = configureStore(preloadedState);

const renderRoot = Component => {
  render(
    <HotContainer>
      <Provider store={store}>
        <BrowserRouter>
          <Component />
        </BrowserRouter>
      </Provider>
    </HotContainer>,
    document.getElementById('root'),
  );
};

renderRoot(App);

if (module.hot) {
  module.hot.accept('./components/App', () => {
    const NextApp = require('./components/App').default;
    renderRoot(NextApp);
  });
}
