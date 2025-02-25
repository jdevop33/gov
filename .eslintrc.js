module.exports = {
  extends: [
    'next/core-web-vitals',
    'plugin:react-hooks/recommended',
    'prettier',
  ],
  rules: {
    // Add custom rules here
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
}