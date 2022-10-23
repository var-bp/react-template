module.exports = {
  presets: [
    [
      '@babel/env',
      {
        // https://babeljs.io/docs/en/babel-preset-env#modules
        modules: false,
      },
    ],
    '@babel/preset-typescript',
    '@babel/preset-react',
    '@linaria',
  ],
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
    test: {
      presets: [
        [
          '@babel/env',
          {
            modules: 'commonjs',
          },
        ],
      ],
    },
  },
};
