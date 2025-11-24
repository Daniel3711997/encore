module.exports = {
    root: true,
    env: {
        es6: true,
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 'latest',
    },
    parser: '@typescript-eslint/parser',
    reportUnusedDisableDirectives: false,
    ignorePatterns: ['lib', 'node_modules'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/stylistic',
        '@react-native',
        'plugin:react/recommended',
        'plugin:import/recommended',
        'standard',
        'prettier',
        'plugin:react-native/all',
        'plugin:import/typescript',
        'plugin:react/jsx-runtime',
        'plugin:react-native-a11y/all',
        'plugin:react-hooks/recommended',
        'plugin:@eslint-community/eslint-comments/recommended',
    ],
    settings: {
        react: {
            version: 'detect',
        },
        'import/resolver': {
            typescript: {
                alwaysTryTypes: true,
                project: './tsconfig.json',
            },
        },
        'import/parsers': {
            '@typescript-eslint/parser': ['.ts', '.tsx'],
        },
    },
    rules: {
        'react-native/sort-styles': 'off',
        'react-native/no-raw-text': 'off',

        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'error',

        'react/button-has-type': 'error',
        'react/jsx-boolean-value': 'error',
        'react/self-closing-comp': 'error',
        'react/jsx-wrap-multilines': 'error',
        'react/no-did-mount-set-state': 'error',
        'react/jsx-no-useless-fragment': 'error',
        'react/no-did-update-set-state': 'error',
        'react/no-unstable-nested-components': 'error',
        'react/no-unknown-property': [
            'error',
            {
                ignore: ['jsx', 'global'],
            },
        ],
        'react/jsx-curly-brace-presence': [
            'error',
            {
                props: 'never',
                children: 'never',
                propElementValues: 'always',
            },
        ],

        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': 'error',

        camelcase: 'off',
        '@typescript-eslint/naming-convention': [
            'error',
            { format: null, selector: 'objectLiteralProperty' },
            {
                selector: 'default',
                leadingUnderscore: 'allowSingleOrDouble',
                trailingUnderscore: 'allowSingleOrDouble',
                format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
            },
        ],

        '@eslint-community/eslint-comments/disable-enable-pair': 'off',
        '@eslint-community/eslint-comments/no-unused-disable': 'error',

        'no-restricted-imports': [
            'error',
            {
                paths: [
                    {
                        name: 'react',
                        importNames: ['default'],
                        message:
                            "Do not import React directly, use the import deconstruction syntax instead. import { ... } from 'react' or import type { ... } from 'react'",
                    },
                ],
            },
        ],

        yoda: ['error', 'always', { onlyEquality: true }],

        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                args: 'all',
                caughtErrors: 'all',
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
                ignoreRestSiblings: true,
                caughtErrorsIgnorePattern: '^_',
                destructuredArrayIgnorePattern: '^_',
            },
        ],

        'import/order': [
            'error',
            {
                distinctGroup: true,
                'newlines-between': 'always',
                warnOnUnassignedImports: true,
                pathGroupsExcludedImportTypes: ['type'],
                pathGroups: [
                    { group: 'unknown', position: 'after', pattern: '@/app/**' },
                    { group: 'unknown', position: 'after', pattern: '@/fonts/**' },
                    { group: 'unknown', position: 'after', pattern: '@/images/**' },
                    { group: 'unknown', position: 'after', pattern: '@/styles/**' },
                    { group: 'unknown', position: 'after', pattern: '@/clients/**' },
                ],
                alphabetize: {
                    order: 'asc',
                    orderImportKind: 'asc',
                    caseInsensitive: true,
                },
                groups: ['type', 'builtin', 'external', 'internal', 'unknown', 'parent', 'sibling', 'index', 'object'],
            },
        ],

        /**
         * Disable the following rules from the eslint-config-react-native package as they are already covered by other rules in this configuration file and the eslint-plugin-eslint-comments package is deprecated.
         *
         * @see https://github.com/facebook/react-native/blob/main/packages/eslint-config-react-native/index.js#L247
         */
        'eslint-comments/no-unused-enable': 'off',
        'eslint-comments/no-unused-disable': 'off',
        'eslint-comments/no-unlimited-disable': 'off',
        'eslint-comments/no-aggregating-enable': 'off',
    },
    overrides: [
        {
            plugins: ['sort-exports'],
            files: ['**/index.js', '**/index.ts'],
            rules: {
                'sort-exports/sort-exports': [
                    'error',
                    { sortDir: 'asc', ignoreCase: true, disableAutofixer: false, sortExportKindFirst: 'value' },
                ],
            },
        },
        {
            files: ['**/*.ts', '**/*.tsx'],
            rules: {
                'no-return-await': 'off',
                '@typescript-eslint/return-await': ['error', 'always'],
                'no-use-before-define': 'off',
                '@typescript-eslint/no-use-before-define': [
                    'error',
                    {
                        classes: false,
                        functions: false,
                        variables: false,

                        enums: false,
                        typedefs: false,
                        ignoreTypeReferences: true,
                    },
                ],
                'no-void': [
                    'error',
                    {
                        allowAsStatement: true,
                    },
                ],
                '@typescript-eslint/no-this-alias': [
                    'error',
                    {
                        allowedNames: ['self'],
                        allowDestructuring: true,
                    },
                ],
                // '@typescript-eslint/no-empty-object-type': [
                //     'error',
                //     {
                //         allowInterfaces: 'with-single-extends',
                //     },
                // ],
                '@typescript-eslint/no-non-null-assertion': 'off',
                '@typescript-eslint/non-nullable-type-assertion-style': 'off',
            },
            parserOptions: {
                projectService: true,
                tsconfigRootDir: __dirname,
            },
            extends: [
                'plugin:@typescript-eslint/strict-type-checked',
                'plugin:@typescript-eslint/stylistic-type-checked',
            ],
        },
    ],
};
