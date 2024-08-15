module.exports = {
    root: true,
    env: {
        node: true,
        browser: true,
        es2021: true
    },
    extends: ['plugin:vue/essential', 'eslint:recommended', 'plugin:prettier/recommended', '@vue/prettier'],
    plugins: ['vue', 'prettier'],
    rules: {
        'prettier/prettier': 'error',
        'vue/html-closing-bracket-newline': [
            'error',
            {
                multiline: 'never',
                singleline: 'never'
            }
        ],
        'no-unused-vars': 1,
        'vue/multi-word-component-names': 'off'
    },
    overrides: [
        {
            files: ['*.js'],
            // ...针对 .js 文件的规则...
            rules: {
                'no-unused-vars': 1
            }
        },
        {
            files: ['*.vue'],
            parser: 'vue-eslint-parser',
            parserOptions: {
                parser: {
                    js: 'espree', // 默认值
                    jsx: 'espree' // 默认值
                }
            },
            // ...针对 .vue 文件的规则...
            rules: {
                'no-unused-vars': 1,
                'vue/multi-word-component-names': 'off'
            }
        }
    ]
};

