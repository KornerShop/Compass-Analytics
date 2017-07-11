/* eslint-disable global-require */

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { AppContainer as HotContainer } from 'react-hot-loader';
import Perf from 'react-addons-perf';

import App from './components/App';

window.Perf = Perf;
Perf.start();

const renderRoot = Component => {
  render(
    <HotContainer>
      <BrowserRouter>
        <Component />
      </BrowserRouter>
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
