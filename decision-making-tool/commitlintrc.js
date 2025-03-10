module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-pattern': [
      2,
      'always',
      /^(feat|fix|docs|style|refactor|perf|test|chore|revert)?(: )?\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2} - .+$/,
    ],
  },
};
