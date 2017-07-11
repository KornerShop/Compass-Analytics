/* eslint-disable no-console */

const http = require('http');
const express = require('express');
const compression = require('compression');
const socket = require('socket.io');
const React = require('react');
const { renderToString } = require('react-dom/server');
const { StaticRouter } = require('react-router-dom');
const _ = require('lodash');
const fs = require('fs');
const { ServerStyleSheet } = require('styled-components');

const App = require('./src/index').default;

const PORT = process.env.PORT || 8080;
const app = express();
const server = http.Server(app);
const io = socket(server);

server.use(compression());

const baseTemplate = fs.readFileSync('./index.html');
const template = _.template(baseTemplate);

server.use((req, res) => {
  console.log(req.url);
  const context = {};
  const sheet = new ServerStyleSheet();
  const body = renderToString(
    React.createElement(
      StaticRouter,
      { location: req.url, context },
      sheet.collectStyles(React.createElement(App)),
    ),
  );

  if (context.url) {
    res.redirect(context.url);
  }

  res.write(template({ body }));
  res.end();
});

server.listen(PORT, () =>
  console.log(`server listening at http://localhost:${PORT}`),
);
