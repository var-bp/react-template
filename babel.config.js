module.exports = {
  presets: ['@babel/env', '@babel/preset-typescript', '@babel/preset-react', '@linaria'],
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
