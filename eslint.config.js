import js from '@eslint/js'
import tsPlugin from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import vuePlugin from 'eslint-plugin-vue'

export default [
  {
    ignores: ['node_modules', '.nuxt', 'dist'],
  },
  {
    files: ['**/*.js'],
    ...js.configs.recommended,
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...(tsPlugin.configs.recommended?.rules ?? {}),
    },
  },
  {
    files: ['**/*.vue'],
    languageOptions: {
      parser: await import('vue-eslint-parser').then(m => m.default || m),
      parserOptions: {
        parser: {
          ts: tsParser,
          js: tsParser,
        },
        ecmaVersion: 'latest',
        sourceType: 'module',
        extraFileExtensions: ['.vue'],
        project: './tsconfig.json',
      },
    },
    plugins: {
      vue: vuePlugin,
      '@typescript-eslint': tsPlugin,
    },
    rules: {
      ...(vuePlugin.configs['vue3-recommended']?.rules ?? {}),
      ...(tsPlugin.configs.recommended?.rules ?? {}),
    },
  },
]
