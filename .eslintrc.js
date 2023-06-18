module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  extends: ['plugin:@typescript-eslint/recommended', 'prettier'],
  rules: {
    'prettier/prettier': [
      'error',
      {},
    ],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    // allows ignoring ts checks
    '@typescript-eslint/ban-ts-comment': 'off',
    // allows destructuring to ignore fields
    '@typescript-eslint/no-unused-vars': ['warn', { ignoreRestSiblings: true }],
  },
}
