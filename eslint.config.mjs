import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  globalIgnores([
    '**/node_modules',
    '**/build',
    '**/dist',
    '**/coverage',
    '**/public',
    '**/*.d.ts',
  ]),
  {
    extends: fixupConfigRules(
      compat.extends(
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
      ),
    ),

    languageOptions: {
      globals: {
        ...globals.node,
      },

      parser: tsParser,
    },

    rules: {
      '@typescript-eslint/ban-types': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-this-alias': 'off',
      '@typescript-eslint/consistent-type-imports': 'warn',
      'jsx-quotes': ['warn', 'prefer-double'],
      'no-case-declarations': 'off',
      'no-prototype-builtins': 'off',
      'no-useless-escape': 'off',

      quotes: [
        'warn',
        'single',
        {
          allowTemplateLiterals: true,
          avoidEscape: true,
        },
      ],

      semi: ['warn', 'always'],
    },
  },
  {
    files: ['**/*.controller.*'],

    rules: {
      '@typescript-eslint/consistent-type-imports': 'off',
    },
  },
]);
