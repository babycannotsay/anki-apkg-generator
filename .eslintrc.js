module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'prettier'
    ],
    rules: {
        'quotes': 'off',
        '@typescript-eslint/quotes': ['error', 'single'],
        'semi': 'off',
        '@typescript-eslint/semi': ['error', 'never', { 'beforeStatementContinuationChars': 'never' }],
        'space-before-function-paren': 'off',
        '@typescript-eslint/space-before-function-paren': ['error'],
        'indent': 'off',
        '@typescript-eslint/indent': ['error'],
        'no-undef': 'off',
        'keyword-spacing': 'off',
        '@typescript-eslint/keyword-spacing': ['error'],
        'object-curly-spacing': 'off',
        '@typescript-eslint/object-curly-spacing': ['error', 'always'],
        'no-multi-spaces': 'error',
        'no-multiple-empty-lines': 'error',
        'no-trailing-spaces': 'error',
        'block-spacing': 'error',
        'space-before-blocks': 'error',
        'eol-last': ['error', 'always']
    }
}
