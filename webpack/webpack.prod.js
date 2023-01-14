/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const { merge } = require('webpack-merge');
// const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ESBuildMinifyPlugin } = require('esbuild-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { env, getCSSModuleLocalIdent } = require('./utils');

// Source maps are resource heavy and can cause out of memory issue for large source files.
const IS_SOURCE_MAP = false;

module.exports = merge(
  {
    mode: 'production',
    // Stop compilation early in production
    bail: true,
    devtool: IS_SOURCE_MAP ? 'source-map' : false,
    output: {
      filename: 'js/[name].[contenthash:8].js',
      chunkFilename: 'js/[name].[contenthash:8].chunk.js',
      clean: true,
    },
    optimization: {
      minimize: true,
      minimizer: [
        new ESBuildMinifyPlugin({
          target: 'es2020',
          css: true,
        }),
      ],
    },
    module: {
      rules: [
        // "postcss" loader applies autoprefixer to our CSS.
        // "css" loader resolves paths in CSS and adds assets as dependencies.
        {
          test: /\.css$/,
          exclude: /\.module\.css$/,
          resourceQuery: { not: [/raw/] },
          use: [
            { loader: MiniCssExtractPlugin.loader },
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                sourceMap: IS_SOURCE_MAP,
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
                  plugins: [
                    'postcss-sort-media-queries',
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
                sourceMap: IS_SOURCE_MAP,
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
            { loader: MiniCssExtractPlugin.loader },
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
                  plugins: [
                    'postcss-sort-media-queries',
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
                sourceMap: IS_SOURCE_MAP,
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
        NODE_ENV: 'production',
        ...env,
      }),
      // new CompressionPlugin({
      //   // compression is only for js & css
      //   test: /\.(js|css)$/,
      //   algorithm: 'gzip',
      // }),
      // Generates an `index.html` file with the <script> injected.
      new HtmlWebpackPlugin({
        filename: 'index.html',
        template: path.join(__dirname, '../public/index.html'),
        env: {
          NODE_ENV: 'production',
          ...env,
        },
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeRedundantAttributes: true,
          useShortDoctype: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
          keepClosingSlash: true,
          minifyJS: true,
          minifyCSS: true,
          minifyURLs: true,
        },
      }),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].chunk.css',
      }),
      // Moment.js is an extremely popular library that bundles large locale files
      // by default due to how webpack interprets its code. This is a practical
      // solution that requires the user to opt into importing specific locales.
      // https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
      // You can remove this if you don't use Moment.js:
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/,
      }),
    ],
  },
  require('./webpack.base'),
);
