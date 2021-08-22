module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    '@vue/typescript/recommended',
    '@vue/airbnb',
    '@vue/prettier',
    '@vue/prettier/@typescript-eslint',
  ],
  parserOptions: {
    ecmaVersion: 2020,
    parser: '@typescript-eslint/parser',
  },
  rules: {
    'import/no-cycle': [
      2,
      {
        maxDepth: 1,
      },
    ],
    'import/no-dynamic-require': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-plusplus': [
      'error',
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    'no-restricted-syntax': 'off',
    'object-shorthand': [
      'error',
      'always',
      {
        avoidExplicitReturnArrows: true,
      },
    ],
    'vue/html-closing-bracket-newline': [
      'error',
      {
        multiline: 'always',
        singleline: 'never',
      },
    ],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          component: 'always',
          normal: 'always',
          void: 'always',
        },
        math: 'always',
        svg: 'always',
      },
    ],
    'vue/new-line-between-multi-line-property': 'error',
    'vue/no-duplicate-attr-inheritance': 'error',
    'vue/no-multiple-objects-in-class': 'error',
    'vue/no-parsing-error': [
      2,
      {
        'invalid-first-character-of-tag-name': false,
      },
    ],
    'vue/no-potential-component-option-typo': 'error',
    'vue/no-template-target-blank': 'error',
    'vue/no-unused-properties': [
      'warn',
      {
        groups: ['props', 'data', 'computed', 'methods', 'setup'],
      },
    ],
    'vue/no-useless-mustaches': 'error',
    'vue/no-useless-v-bind': 'error',
    'vue/padding-line-between-blocks': 'error',
    'vue/v-for-delimiter-style': ['error', 'of'],
    '@typescript-eslint/no-unused-vars': 'error',
    'no-unused-vars': 'off',
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)'],
      env: {
        jest: true,
      },
    },
    {
      files: ['*.html'],
      processor: 'vue/.vue',
    },
  ],
}
