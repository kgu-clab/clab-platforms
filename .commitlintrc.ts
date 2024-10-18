export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'scope-empty': [2, 'never'], // 반드시 scope를 포함해야 합니다.
    'scope-case': [2, 'always', 'lower-case'], // scope는 항상 소문자여야 합니다.
    'scope-enum': [
      2,
      'always',
      [
        // scope는 이 목록에 있는 값 중 하나여야 합니다.
        '*',
        'root',
        'auth',
        'land',
        'member',
        'time',
        'config',
        'design-system',
        'icon',
        'utils',
        'ci',
        'changeset',
        'husky',
        'github',
      ],
    ],
  },
};
