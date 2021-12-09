module.exports = {
  presets: ['@babel/env', '@babel/preset-typescript', '@babel/preset-react', '@linaria'],
  plugins: ['@babel/plugin-transform-runtime'],
  env: {
    production: {
      plugins: [
        'date-fns',
        'lodash',
        'transform-react-remove-prop-types',
        ['react-remove-properties', { properties: ['data-testid'] }],
      ],
    },
  },
};
