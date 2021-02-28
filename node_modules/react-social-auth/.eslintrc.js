module.exports = {
  extends: 'smartprocure',
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
  },
  settings: {
    react: {
      createClass: 'createReactClass',
      pragma: 'React',
      version: 'detect',
    },
  },
}
