module.exports = {
  extends: [
    'standard',
    'plugin:react/recommended'
  ],
  parserOptions: {
    ecmaVersion: 9, // support spread op
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    }
  },

  rules: {
    // suppress errors for missing 'import React' in files
    'react/react-in-jsx-scope': 'off'
  }
}
