/* eslint-disable no-console */
require('babel-polyfill');
require('babel-register')({
  presets: ['env', 'react'],
});

const mongoose = require('mongoose');
const http = require('http');
const express = require('express');
const compression = require('compression');
const socketio = require('socket.io');
const React = require('react');
const { renderToString } = require('react-dom/server');
const { StaticRouter } = require('react-router-dom');
const fs = require('fs');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpack = require('webpack');
const { ServerStyleSheet } = require('styled-components');

const {
  populateLang,
  updateLang,
} = require('./server/language/language.controller');
const {
  populateZip,
  updateZip,
} = require('./server/zip/zip.controller');
const {
  populateOffice,
  updateOffice,
} = require('./server/office/office.controller');
const {
  populateNav,
  updateNav,
} = require('./server/navigation/navigation.controller');

const config = require('./server/config/config');
const wpConfig = require('./config/webpack.config');
const App = require('./client/components/App').default;

const PORT = process.env.PORT || 8080;

const app = express();
const server = http.Server(app);
const io = socketio(server);

mongoose.connect(config.db.url, {
  useMongoClient: true,
});

mongoose.Promise = Promise;

if (config.seed) {
  require('./server/seed');
}

const compiler = webpack(wpConfig);
app.use(
  webpackDevMiddleware(compiler, {
    publicPath: wpConfig.output.publicPath
  })
);
app.use(webpackHotMiddleware(compiler));

app.use(compression());

app.use('/dist', express.static('./dist'));

const renderFullPage = (title, css, html) => `
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
          <div id="root">${html}</div>
          <script src="/dist/bundle.js"></script>
        </body>
      </html>
  `;

const handleRender = (req, res) => {
  const context = {};
  const sheet = new ServerStyleSheet();
  const html = renderToString(
    React.createElement(
      StaticRouter,
      { location: req.url, context },
      sheet.collectStyles(React.createElement(App))
    )
  );
  const css = sheet.getStyleTags();
  if (context.url) {
    res.redirect(context.url);
    res.end();
  }
  res.send(renderFullPage('Compass Analytics', css, html));
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

app.get('*', handleRender);

server.listen(PORT, () =>
  console.log(`server listening at http://localhost:${PORT}`)
);
