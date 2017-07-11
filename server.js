/* eslint-disable no-console */

require('babel-core/register')({
    presets: ['env', 'react']
})

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

const App = require('./src/components/App').default;

const PORT = process.env.PORT || 8080;

const app = express();
const server = http.Server(app);
const io = socket(server);

app.use(compression());

app.use('/dist', express.static('./dist'));

const sheet = new ServerStyleSheet();

const handleRender = (req, res) => {
  console.log(req.url)
  const context = {};
  const html = renderToString(React.createElement(
    StaticRouter,
    { location: req.url, context },
    sheet.collectStyles(React.createElement(App))
  ))
  if (context.url) {
    res.redirect(context.url);
  }
  fs.readFile('./dist/index.html', 'utf8', (err, file) => {
    if (err) { console.log(err) }
    const document = file.replace(/<div id='root'><\/div>/, `<div id='root'>${html}</div>`)
    res.send(document)
  })
}

app.get('*', handleRender)

server.listen(PORT, () =>
  console.log(`server listening at http://localhost:${PORT}`)
);
