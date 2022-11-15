module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.eslint.json', './tsconfig.json'],
    // https://github.com/typescript-eslint/typescript-eslint/issues/251#issuecomment-567365174
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:eslint-comments/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/jsx-runtime',
  ],
  settings: {
    react: {
      pragma: 'React',
      version: '17.0',
    },
  },
  rules: {
    // Disable error on devDependencies importing since this isn't a TS library
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'no-await-in-loop': 0,
    'prefer-destructuring': 0,
    'no-bitwise': 0,
    'class-methods-use-this': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/lines-between-class-members': [
      'error',
      'always',
      { exceptAfterSingleLine: true },
    ],
    'import/order': [
      'error',
      {
        groups: [['builtin', 'external', 'internal'], ['parent'], ['sibling', 'index']],
        'newlines-between': 'always',
        alphabetize: { order: 'asc' },
      },
    ],
    '@typescript-eslint/consistent-type-imports': 2,
    'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
    'eslint-comments/no-unused-disable': 'error',
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': 'off',
    'no-debugger': 'off',
    'react/no-array-index-key': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-shadow': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    'react/destructuring-assignment': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
  },
};
