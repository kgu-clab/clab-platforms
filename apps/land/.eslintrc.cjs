module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'next/core-web-vitals',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['dist', 'coverage'],
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-console': 'error',
  },
};
