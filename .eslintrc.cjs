let tailwindcssConfig = [];

try {
  const fs = require('fs');
  const path = require('path');

  const reMemberPackageJson = path.join(
    __dirname,
    'apps/re-member/package.json',
  );
  if (fs.existsSync(reMemberPackageJson)) {
    const pkg = JSON.parse(fs.readFileSync(reMemberPackageJson, 'utf8'));
    const tailwindVersion =
      pkg.dependencies?.tailwindcss || pkg.devDependencies?.tailwindcss;
    const isV4 = tailwindVersion && /^[\^~]?4\./.test(tailwindVersion);
    if (isV4) {
      tailwindcssConfig = [];
    } else {
      tailwindcssConfig = ['plugin:tailwindcss/recommended'];
    }
  } else {
    tailwindcssConfig = ['plugin:tailwindcss/recommended'];
  }
} catch (error) {
  tailwindcssConfig = ['plugin:tailwindcss/recommended'];
}

module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:prettier/recommended',
    ...tailwindcssConfig,
  ],
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['apps/re-member/**'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'tailwindcss/no-custom-classname': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-console': 'error',
  },
};
