// eslint.config.js
import nextPlugin from '@next/eslint-plugin-next';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      '.git/**',
      'public/**',
      'dist/**',
      '*.config.js'
    ]
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      '@next/next': nextPlugin,
      '@typescript-eslint': tsPlugin
    },
    languageOptions: {
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',
      
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        process: 'readonly',
        console: 'readonly',
        module: 'readonly',
        require: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        window: 'readonly',
        document: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
        navigator: 'readonly',
        performance: 'readonly',
        fetch: 'readonly',
        React: 'readonly',
        Node: 'readonly',
        HTMLInputElement:'readonly',
        HTMLDivElement:'readonly',
        HTMLInputElement:'readonly',
        MouseEvent:'readonly',
        setTimeout:'readonly',
        clearTimeout:'readonly',
        StepFormContext:'readonly',
        JSX:'readonly',
        HTMLAnchorElement:'readonly',
        HTMLElement:"readonly",
        StepFormContext:"readonly",

      }
    },
    settings: {
      react: {
        version: 'detect'
      },
      next: {
        rootDir: '.'
      }
    },
    rules: {
      'no-unused-vars': 'warn',
      '@typescript-eslint/no-unused-vars': 'warn',
      'react/react-in-jsx-scope': 'off',
    }
  }
];