// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu({
  // Ваши пользовательские настройки
    vue: true,
  typescript: true,
  // Игнорируем определенные файлы и директории
  ignores: [
    'node_modules',
    '.nuxt',
    'dist',
  ],
  rules: {
    indent: ['error', 4],
    "styled/indent": ['error', 4],
    "jsx-first-prop-new-line": ['error', 'always'],
  },
})
