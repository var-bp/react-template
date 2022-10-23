/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { env } = require('./utils');

module.exports = merge(
  {
    mode: 'development',
    // Stop compilation early in production
    bail: false,
    devtool: 'cheap-module-source-map',
    // eslint-disable-next-line global-require
    devServer: require('./server.dev'),
    output: {
      filename: 'js/[name].js',
      // Add /* filename */ comments to generated require()s in the output.
      pathinfo: true,
      // Don't use hashes in dev mode for better performance
      chunkFilename: 'js/[name].chunk.js',
    },
    module: {
      rules: [
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                // This is a feature of `babel-loader` for webpack (not Babel itself).
                // It enables caching results in ./node_modules/.cache/babel-loader/
                // directory for faster rebuilds.
                cacheDirectory: true,
                plugins: [require.resolve('react-refresh/babel')],
              },
            },
            {
              loader: '@linaria/webpack-loader',
              options: {
                sourceMap: true,
              },
            },
          ],
        },
        // "postcss" loader applies autoprefixer to our CSS.
        // "css" loader resolves paths in CSS and adds assets as dependencies.
        // "style" loader turns CSS into JS modules that inject <style> tags.
        {
          test: /\.css$/,
          resourceQuery: { not: [/raw/] },
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
              },
            },
            {
              // Options for PostCSS as we reference these options twice
              // Adds vendor prefixing based on your specified browser support in
              // package.json
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  ident: 'postcss',
                  config: false,
                  plugins: [
                    'postcss-flexbugs-fixes',
                    [
                      'postcss-preset-env',
                      {
                        autoprefixer: {
                          flexbox: 'no-2009',
                        },
                        stage: 3,
                      },
                    ],
                  ],
                },
              },
            },
          ],
          // Don't consider CSS imports dead code even if the
          // containing package claims to have no side effects.
          // Remove this when webpack adds a warning or an error for this.
          // See https://github.com/webpack/webpack/issues/6571
          sideEffects: true,
        },
        // Opt-in support for SASS (using .scss or .sass extensions).
        {
          test: /\.(scss|sass)$/,
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
              },
            },
            {
              // Options for PostCSS as we reference these options twice
              // Adds vendor prefixing based on your specified browser support in
              // package.json
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  ident: 'postcss',
                  config: false,
                  plugins: [
                    'postcss-flexbugs-fixes',
                    [
                      'postcss-preset-env',
                      {
                        autoprefixer: {
                          flexbox: 'no-2009',
                        },
                        stage: 3,
                      },
                    ],
                  ],
                },
              },
            },
            {
              loader: 'sass-loader',
            },
          ],
          // Don't consider CSS imports dead code even if the
          // containing package claims to have no side effects.
          // Remove this when webpack adds a warning or an error for this.
          // See https://github.com/webpack/webpack/issues/6571
          sideEffects: true,
        },
      ],
    },
    plugins: [
      // Makes some environment variables available to the JS code.
      new webpack.EnvironmentPlugin({
        NODE_ENV: 'development',
        ...env,
      }),
      // Experimental hot reloading for React .
      // https://github.com/facebook/react/tree/main/packages/react-refresh
      new ReactRefreshWebpackPlugin({
        overlay: false,
      }),
      // Watcher doesn't work well if you mistype casing in a path so we use
      // a plugin that prints an error when you attempt to do this.
      new CaseSensitivePathsPlugin(),
      // Detect modules with circular dependencies
      new CircularDependencyPlugin({
        exclude: /a\.js|node_modules/,
        failOnError: false,
        allowAsyncCycles: true,
      }),
      // Generates an `index.html` file with the <script> injected.
      new HtmlWebpackPlugin({
        inject: true,
        filename: 'index.html',
        template: path.join(__dirname, '../public/index.html'),
        env: {
          NODE_ENV: 'development',
          ...env,
        },
      }),
      new webpack.WatchIgnorePlugin({ paths: [path.join(__dirname, '../node_modules')] }),
    ],
  },
  require('./webpack.base'),
);
