import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';

export default [
    { files: ['**/*.{js,mjs,cjs,vue}'] },
    { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
    pluginJs.configs.recommended,
    ...pluginVue.configs['flat/essential'],
    {
        rules: {
            'vue/multi-word-component-names': 'off'
        }
    },
    // 忽略某些文件
    {
        ignores: ['**/aa.js']
    }
];
