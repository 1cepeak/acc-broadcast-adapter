export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'header-max-length': [0, 'always'],
    'body-max-length': [0, 'always'],
    'body-max-line-length': [0, 'always'],
    'footer-max-length': [0, 'always'],
    'footer-max-line-length': [0, 'always'],
    'subject-max-length': [0, 'always'],
    'type-max-length': [0, 'always'],
  },
};
