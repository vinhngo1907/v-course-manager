export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat', // Features
        'fix', // Bug Fixes
        'docs', // Documentation
        'style', // Styles
        'refactor', // Code Refactoring
        'perf', // Performance Improvements
        'test', // Tests
        'build', // Build System
        'ci', // CI Configuration
        'chore', // Chores
        'revert', // Reverts,
        'lint', // Lint
      ],
    ],
    'scope-case': [2, 'always', ['lower-case', 'upper-case']],
    'subject-case': [0],
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [2, 'always'],
  },
};
