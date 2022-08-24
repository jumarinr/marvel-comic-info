module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
    'airbnb/hooks',
  ],
  root: true, // For configuration cascading.
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    'import', // eslint-plugin-import plugin. https://www.npmjs.com/package/eslint-plugin-import
  ],
  rules: {
    indent: [
      'error',
      2,
    ],
    quotes: [
      'warn',
      'single',
    ],
    'react/react-in-jsx-scope': 'off',
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
  },
  settings: {
    react: {
      version: '18.2.0',
    },
  },
};
