// http://eslint.org/docs/user-guide/configuring
const OFF = 0
const WARNING = 1
const ERROR = 2

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
  extends: 'standard',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // add your custom rules here
  'rules': {
    // allow paren-less arrow functions
    'arrow-parens': OFF,
    // allow async-await
    'generator-star-spacing': OFF,
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? ERROR : OFF,
    'comma-dangle': [ERROR, "always-multiline"],
  }
}
