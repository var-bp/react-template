/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');

module.exports = {
  // Exists only in webpack-dev-server. It's only needed if you want to serve static files.
  static: {
    directory: path.join(__dirname, '../build'),
  },
  // Tells dev-server to open the browser after server had been started.
  open: false,
  // Enable gzip compression of generated files.
  compress: false,
  client: {
    overlay: {
      warnings: false,
    },
  },
  hot: true,
  historyApiFallback: true,
  host: '0.0.0.0',
  port: 3000,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
};
