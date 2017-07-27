/* eslint-disable no-console */

import './register';

import 'babel-polyfill';
import mongoose from 'mongoose';
import http from 'http';
import express from 'express';
import compression from 'compression';
import bodyParser from 'body-parser';
import socketio from 'socket.io';
import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpack from 'webpack';
// import DashboardPlugin from 'webpack-dashboard/plugin'
import {
  ServerStyleSheet,
  StyleSheetManager,
} from 'styled-components';

import {
  populateLang,
  updateLang,
} from '../server/language/language.controller';
import { populateZip, updateZip } from '../server/zip/zip.controller';
import {
  populateOffice,
  updateOffice,
} from '../server/office/office.controller';
import {
  populateNav,
  updateNav,
} from '../server/navigation/navigation.controller';

import config from '../server/config/config';
import wpConfig from '../config/webpack.config';
import App from '../client/components/App.jsx';
import rootReducer from '../client/redux/reducers';

const PORT = process.env.PORT || 8080;

const app = express();
const server = http.Server(app);
const io = socketio(server);

mongoose.connect(config.db.url, {
  useMongoClient: true,
});

mongoose.Promise = Promise;

if (config.seed) {
  require('../server/seed');
}

const compiler = webpack(wpConfig);
// compiler.apply(new DashboardPlugin());

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: wpConfig.output.publicPath,
  }),
);

app.use(webpackHotMiddleware(compiler));
app.use(compression());
app.use(bodyParser.json());

app.use(express.static('./dist'));

const renderFullPage = (title, css, markup, preloadedState) => `
  <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta http-equiv="X-UA-Compatible" content="ie=edge">
          <title>${title}</title>
          ${css}
        </head>
        <body>
          <div id="root">${markup}</div>
          <script>
            window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
          </script>
          <script src="/dist/bundle.js"></script>
        </body>
      </html>
  `;

const handleRender = (req, res) => {
  const context = {};
  const sheet = new ServerStyleSheet();
  const store = createStore(rootReducer);
  const markup = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <StyleSheetManager sheet={sheet.instance}>
          <App />
        </StyleSheetManager>
      </StaticRouter>
    </Provider>,
  );
  const css = sheet.getStyleTags();
  const preloadedState = store.getState();
  if (context.url) {
    res.redirect(301, context.url);
    res.end();
  }
  res.send(renderFullPage('Compass Analytics', css, markup, preloadedState));
};

io.on('connection', socket => {
  populateLang(socket);
  populateZip(socket);
  populateOffice(socket);
  populateNav(socket);

  socket.on('update-language', lang => {
    updateLang(io, lang);
  });
  socket.on('update-zip', zip => {
    updateZip(io, zip);
  });
  socket.on('update-office', office => {
    updateOffice(io, office);
  });
  socket.on('update-nav', nav => {
    updateNav(io, nav);
  });
});

app.use(require('../server/user/routes'));

app.use(handleRender);

server.listen(PORT, () =>
  console.log(`server listening at http://localhost:${PORT}`)
);
