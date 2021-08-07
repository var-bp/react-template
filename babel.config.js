// eslint-disable-next-line @typescript-eslint/no-var-requires
const PACKAGE_JSON = require('./package.json');

module.exports = {
  presets: ['@babel/preset-typescript', '@babel/preset-react'],
  env: {
    development: {
      plugins: [['babel-plugin-styled-components', { displayName: true, namespace: PACKAGE_JSON.name }]],
    },
    production: {
      plugins: [
        'date-fns',
        'lodash',
        ['babel-plugin-styled-components', { displayName: false, fileName: false, namespace: PACKAGE_JSON.name }],
        'transform-react-remove-prop-types',
        ['react-remove-properties', { properties: ['data-testid'] }],
      ],
    },
    test: {
      presets: ['@babel/env', '@babel/preset-typescript', '@babel/preset-react'],
      plugins: [['babel-plugin-styled-components', { displayName: true, fileName: true }]],
    },
  },
};
