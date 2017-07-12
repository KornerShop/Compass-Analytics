/* eslint-disable no-console */

require('babel-core/register')({
    presets: ['env', 'react']
})

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

const initialData = [
  { name: 'Page A', uv: 0, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 0, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 0, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 0, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 0, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 0, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 0, pv: 4300, amt: 2100 },
];

const handleRender = (req, res) => {
  console.log(req.url)
  const context = {};
  const html = renderToString(React.createElement(
    StaticRouter,
    { location: req.url, context },
    sheet.collectStyles(React.createElement(App, { data: initialData }))
  ))
  if (context.url) {
    res.redirect(context.url);
  }
  fs.readFile('./dist/index.html', 'utf8', (err, file) => {
    if (err) { console.log(err) }
    console.log(`html: ${html}`)
    const document = file.replace(/<div id="root"><\/div>/, `<div id="root">${html}</div>`)
    console.log(`document: ${document}`)
    res.send(document)
  })
}

const data = [
  { name: 'Page A', uv: 2000, pv: 2400, amt: 2400 },
  { name: 'Page B', uv: 3000, pv: 1398, amt: 2210 },
  { name: 'Page C', uv: 2000, pv: 9800, amt: 2290 },
  { name: 'Page D', uv: 2780, pv: 3908, amt: 2000 },
  { name: 'Page E', uv: 1890, pv: 4800, amt: 2181 },
  { name: 'Page F', uv: 2390, pv: 3800, amt: 2500 },
  { name: 'Page G', uv: 3490, pv: 4300, amt: 2100 },
];

webSocket.on('connection', socket => {
  console.log(`A client just joined on ${socket.id}`);
  webSocket.emit('data', data)
})

app.get('*', handleRender)

server.listen(PORT, () =>
  console.log(`server listening at http://localhost:${PORT}`)
);
