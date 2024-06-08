import globals from 'globals';
import pluginJs from '@eslint/js';


export default [
    {
        files: ['**/*.js'],
        languageOptions: { sourceType: 'module' },
    },
    {
        ignores: [
            '**/migrations/',
            '**/models/',
            '**/config/',
        ],
    },
    { languageOptions: { globals: globals.browser } },
    pluginJs.configs.recommended,
    {
        'rules': {
            'indent': [
                'error',
                4,
            ],
            'quotes': [
                'error',
                'single',
            ],
            'semi': [
                'error',
                'always',
            ],
            'comma-dangle': ['error', 'always-multiline'],
            'comma-spacing': 'error',
            'comma-style': 'error',
            'dot-location': ['error', 'property'],
            'handle-callback-err': 'off',
            'max-nested-callbacks': ['error', {
                'max': 4,
            }],
            'max-statements-per-line': ['error', {
                'max': 3,
            }],
            'no-console': 'off',
            'no-empty-function': 'error',
            'no-floating-decimal': 'error',
            'no-inline-comments': 'error',
            'no-lonely-if': 'error',
            'no-multi-spaces': 'error',
            'no-multiple-empty-lines': ['error', {
                'max': 2,
                'maxEOF': 1,
                'maxBOF': 0,
            }],
            'no-shadow': ['error', {
                'allow': ['err', 'resolve', 'reject'],
            }],
            'no-trailing-spaces': ['error'],
            'no-var': 'error',
            'object-curly-spacing': ['error', 'always'],
            'prefer-const': 'error',
            'space-before-blocks': 'error',
            'space-before-function-paren': ['error', {
                'anonymous': 'never',
                'named': 'never',
                'asyncArrow': 'always',
            }],
            'space-in-parens': 'error',
            'space-infix-ops': 'error',
            'space-unary-ops': 'error',
            'spaced-comment': 'error',
            'yoda': 'error',
            'arrow-spacing': ['error', { 'before': true, 'after': true }],
            'nonblock-statement-body-position': ['error', 'beside'],
            'keyword-spacing': ['error', { 'before': true, 'after': true }],
        },
    },
];