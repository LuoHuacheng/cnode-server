// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
  },
  extends: 'standard',
  // add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
  },
};
