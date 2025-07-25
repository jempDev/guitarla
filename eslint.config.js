import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import reactPlugin from 'eslint-plugin-react'
import prettierPlugin from 'eslint-plugin-prettier' // 👈 Nuevo plugin
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      react: reactPlugin,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: prettierPlugin,
    },
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      'plugin:react/recommended', // 👈 Asegúrate de que esto esté ANTES de Prettier
      'plugin:prettier/recommended', // 👈 Extiende la config recomendada de Prettier
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          jsxBracketSameLine: false, // Fuerza multilínea
          printWidth: 80, // Ajusta según necesidad
        },
      ],
      // Reglas específicas para props:
      'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],
      'react/jsx-max-props-per-line': [
        'error',
        {
          maximum: 3, // Hasta 3 props en línea
          when: 'always',
        },
      ],
      'react/jsx-first-prop-new-line': ['error', 'never'],
    },
  },
])
