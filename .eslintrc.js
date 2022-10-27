module.exports = {
  "extends": [
    // "eslint:recommended",
    "plugin:react/recommended"
  ],
  "plugins": [
    "react"
  ],
  "parserOptions": {
    "ecmaVersion": 9,
    "sourceType": "module"
  },
  "env":{ 
    "es6": true,
    "browser": true,
    "node": true
  },
  "rules": {
    'no-console': 'off',
    'object-curly-newline': 'off',
    'no-unused-vars': 'off',
    'no-param-reassign': 'off',
  },
};
