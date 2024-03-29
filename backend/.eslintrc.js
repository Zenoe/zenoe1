module.exports = {
  extends: ['standard'],
  parserOptions: {
    ecmaVersion: 8, // eslint Parsing error: Unexpected token function with async
    sourceType: 'module'
  },

  env: {
    node: true,
    es6: true
  },

  rules: {
    camelcase: 'off',
    'no-restricted-syntax': ["error", "IfStatement > ExpressionStatement > AssignmentExpression"]
  }
}
