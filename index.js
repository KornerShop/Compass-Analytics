/* eslint-disable no-console */
require('babel-core/register')({
  presets: ['env', 'react'],
});

const languageEventHandler = require('./server/language/language.controller');
const zipCodeEventHandler = require('./server/zip/zip.controller')
const officeEventHandler = require('./server/office/office.controller')
const navigationEventHandler = require('./server/navigation/navigation.controller')

const config = require('./server/config/config');
const mongoose = require('mongoose')

mongoose.connect(config.db.url, {
  useMongoClient: true
});

mongoose.Promise = Promise

if (config.seed) {
  require('./server/util/seed');
}

const http = require('http');
const express = require('express');
const compression = require('compression');
const socketio = require('socket.io');
const React = require('react');
const { renderToString } = require('react-dom/server');
const { StaticRouter } = require('react-router-dom');
const fs = require('fs');
const { ServerStyleSheet } = require('styled-components');

const App = require('./src/components/App').default;

const PORT = process.env.PORT || 8080;

const app = express();
const server = http.Server(app);
const webSocket = socketio(server);

app.use(compression());

app.use('/dist', express.static('./dist'));

const sheet = new ServerStyleSheet();

const handleRender = (req, res) => {
  const context = {};
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
  fs.readFile('./index.html', 'utf8', (err, file) => {
    if (err) {
      console.log(err);
    }
    const document = file.replace(
      /<div id="root"><\/div>/,
      `<div id="root">${body}</div>`,
    );
    res.send(document);
  });
};

webSocket.on('connection', socket  => {
  console.log(`A client just joined on ${socket.id}`);
  languageEventHandler(socket)
  // zipCodeEventHandler(socket)
  // officeEventHandler(socket)
  // navigationEventHandler(socket)
});


app.get('*', handleRender);

server.listen(PORT, () =>
  console.log(`server listening at http://localhost:${PORT}`),
);
