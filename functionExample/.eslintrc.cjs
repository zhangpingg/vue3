module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/essential',
    'eslint:recommended',
    'plugin:prettier/recommended',
    '@vue/prettier',
  ],
  plugins: [
    'vue',
    'prettier',
  ],
  rules: {
    'prettier/prettier': 'error',
    'vue/html-closing-bracket-newline': [
      'error',
      {
        multiline: 'never',
        singleline: 'never',
      },
    ],
    "no-unused-vars": 1,
  },
};