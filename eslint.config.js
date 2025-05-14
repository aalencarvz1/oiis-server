import globals from "globals";
import tseslint from "typescript-eslint";
import { defineConfig } from "eslint/config";

export default defineConfig([    
  {
    ignores: ["dist/**/*", "node_modules/**/*"],
  },
  ...tseslint.configs.recommended,
  {
    files: ["src/**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
      },
      globals: globals.node,
    },    
    plugins: {
      "@typescript-eslint": tseslint.plugin,
    },
    rules: {
      // Regra para forçar === e !==
      eqeqeq: ["warn", "always"],

      // Regras do TypeScript
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
      "@typescript-eslint/no-explicit-any": "off",      
      //"@typescript-eslint/explicit-function-return-type": "off",

      // Outras regras úteis
      //"no-console": "off",
    },
  },
]);
