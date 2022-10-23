/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const { WebpackManifestPlugin } = require('webpack-manifest-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const PACKAGE_JSON = require('../package.json');

module.exports = {
  entry: path.join(__dirname, '../src/index.tsx'),
  output: {
    uniqueName: PACKAGE_JSON.name,
    path: path.join(__dirname, '../build'),
    // webpack uses `publicPath` to determine where the app is being served from.
    // It requires a trailing slash, or the file assets will get an incorrect path.
    publicPath: '/',
  },
  optimization: {
    // Automatically split vendor and commons
    // An in-depth guide https://medium.com/jspoint/react-router-and-webpack-v4-code-splitting-using-splitchunksplugin-f0a48f110312
    splitChunks: {
      chunks: 'all',
      name: false,
      // maxSize: 1000 * 600, // 600KB, average .js file will be ~300KB
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
    fallback: {
      fs: false,
    },
  },
  module: {
    // Makes missing exports an error instead of warning.
    strictExportPresence: true,
    rules: [
      // First, run the linter.
      // It's important to do this before Babel processes the JS.
      // {
      //   test: /\.(js|mjs|jsx|ts|tsx)$/,
      //   include: path.join(__dirname, '../src'),
      //   enforce: 'pre',
      //   use: [
      //     {
      //       loader: 'eslint-loader',
      //       options: {
      //         cache: true,
      //         eslintPath: 'eslint',
      //         resolvePluginsRelativeTo: __dirname,
      //       },
      //     },
      //   ],
      // },
      {
        // https://github.com/jantimon/html-webpack-plugin/issues/1589#issuecomment-768418074
        exclude: [/(^|\.(js|mjs|jsx|ts|tsx|html|css|scss|sass|json|jsonp))$/],
        type: 'asset/resource',
        generator: {
          filename: 'static/[name].[hash:8][ext]',
        },
      },
      // https://webpack.js.org/guides/asset-modules/#replacing-inline-loader-syntax
      {
        resourceQuery: /raw/,
        type: 'asset/source',
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.join(__dirname, '../public'),
          to: './',
          globOptions: {
            dot: true,
            ignore: ['**/*.html', '**/.DS_Store'],
          },
        },
      ],
    }),
    new ESLintPlugin({ extensions: ['js', 'jsx', 'ts', 'tsx'] }),
    // Generate an asset manifest file with the following content:
    // - "files" key: Mapping of all asset filenames to their corresponding
    //   output file so that tools can pick it up without having to parse
    //   `index.html`
    // - "entrypoints" key: Array of files which are included in `index.html`,
    //   can be used to reconstruct the HTML if necessary
    new WebpackManifestPlugin({
      fileName: 'asset-manifest.json',
      publicPath: '/',
      generate: (seed, files, entrypoints) => {
        const manifestFiles = files.reduce((manifest, file) => {
          // eslint-disable-next-line no-param-reassign
          manifest[file.name] = file.path;
          return manifest;
        }, seed);
        const entrypointFiles = entrypoints.main.filter((fileName) => !fileName.endsWith('.map'));
        return {
          files: manifestFiles,
          entrypoints: entrypointFiles,
        };
      },
    }),
  ],
};
