/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const { env, getCSSModuleLocalIdent } = require('./utils');

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
        // "postcss" loader applies autoprefixer to our CSS.
        // "css" loader resolves paths in CSS and adds assets as dependencies.
        // "style" loader turns CSS into JS modules that inject <style> tags.
        {
          test: /\.css$/,
          exclude: /\.module\.css$/,
          resourceQuery: { not: [/raw/] },
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: true,
                modules: {
                  mode: 'icss',
                },
              },
            },
            {
              // Options for PostCSS as we reference these options twice
              // Adds vendor prefixing based on your specified browser support in .browserslistrc
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  ident: 'postcss',
                  config: false,
                  plugins: ['postcss-flexbugs-fixes', 'postcss-normalize'],
                },
                sourceMap: true,
              },
            },
          ],
          // Don't consider CSS imports dead code even if the
          // containing package claims to have no side effects.
          // Remove this when webpack adds a warning or an error for this.
          // See https://github.com/webpack/webpack/issues/6571
          sideEffects: true,
        },
        {
          test: /\.module\.css$/,
          resourceQuery: { not: [/raw/] },
          use: [
            'style-loader',
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: true,
                modules: {
                  // Using 'local' value has same effect like using 'modules: true'
                  mode: 'local',
                  getLocalIdent: getCSSModuleLocalIdent,
                },
              },
            },
            {
              // Options for PostCSS as we reference these options twice
              // Adds vendor prefixing based on your specified browser support in .browserslistrc
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  ident: 'postcss',
                  config: false,
                  plugins: ['postcss-flexbugs-fixes', 'postcss-normalize'],
                },
                sourceMap: true,
              },
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
