/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
const path = require('path');
const fs = require('fs');
const { merge } = require('webpack-merge');
const StylelintPlugin = require('stylelint-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = merge(
  {
    entry: {
      app: path.join(__dirname, '../src/index.tsx'),
    },
    output: {
      path: path.join(__dirname, '../build'),
      // webpack uses `publicPath` to determine where the app is being served from.
      // It requires a trailing slash, or the file assets will get an incorrect path.
      publicPath: '/',
      // Prevents conflicts when multiple webpack runtimes (from different apps)
      // are used on the same page.
      jsonpFunction: `webpackJsonp${require('../package.json').name}`,
      // this defaults to 'window', but by setting it to 'this' then
      // module chunks which are built will work in web workers as well.
      globalObject: 'this',
    },
    // Some libraries import Node modules but don't use them in the browser.
    // Tell webpack to provide empty mocks for them so importing them works.
    node: {
      module: 'empty',
      dgram: 'empty',
      dns: 'mock',
      fs: 'empty',
      http2: 'empty',
      net: 'empty',
      tls: 'empty',
      child_process: 'empty',
    },
    optimization: {
      // Automatically split vendor and commons
      // An in-depth guide https://medium.com/jspoint/react-router-and-webpack-v4-code-splitting-using-splitchunksplugin-f0a48f110312
      splitChunks: {
        chunks: 'all',
        name: false,
      },
      // Keep the runtime chunk separated to enable long term caching.
      runtimeChunk: {
        name: (entrypoint) => `runtime-${entrypoint.name}`,
      },
    },
    resolve: {
      // This allows you to set a fallback for where webpack should look for modules.
      // We placed these paths second because we want `node_modules` to "win"
      // if there are any conflicts.
      modules: ['node_modules', path.join(__dirname, '../node_modules')],
      // These are the reasonable defaults supported by the Node ecosystem.
      // We also include JSX as a common component filename extension to support
      // some tools.
      extensions: ['.mjs', '.js', '.jsx', '.ts', '.tsx', '.json'],
    },
    module: {
      // Makes missing exports an error instead of warning.
      strictExportPresence: true,
      rules: [
        // Disable require.ensure as it's not a standard language feature.
        { parser: { requireEnsure: false } },
        // First, run the linter.
        // It's important to do this before Babel processes the JS.
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          include: path.join(__dirname, '../src'),
          enforce: 'pre',
          use: [
            {
              loader: 'eslint-loader',
              options: {
                cache: true,
                eslintPath: 'eslint',
                resolvePluginsRelativeTo: __dirname,
              },
            },
          ],
        },
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              // This is a feature of `babel-loader` for webpack (not Babel itself).
              // It enables caching results in ./node_modules/.cache/babel-loader/
              // directory for faster rebuilds.
              cacheDirectory: true,
            },
          },
        },
        {
          loader: 'file-loader',
          exclude: [
            /\.(js|mjs|jsx|ts|tsx)$/,
            /\.html$/,
            /\.css$/,
            /\.(scss|sass)$/,
            /\.(json|jsonp)$/,
          ],
          options: {
            name: 'media/[name].[hash:8].[ext]',
          },
        },
      ],
    },
    plugins: [
      // A linter for CSS-like syntaxes like SCSS, Sass, Less and SugarSS
      new StylelintPlugin({
        files: '**/*.{scss,sass,css}',
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: path.join(__dirname, '../src/static/favicon'),
            to: './media',
          },
        ],
      }),
    ],
  },
  {
    plugins: fs.existsSync(path.join(__dirname, '../.env'))
      ? [
          // If no .env file then no Dotenv plugin.
          new Dotenv({
            path: './.env',
          }),
        ]
      : [],
  },
);
