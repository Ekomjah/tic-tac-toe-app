// eslint.config.js
import js from "@eslint/js";
import reactPlugin from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import jsxA11y from "eslint-plugin-jsx-a11y";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  // ignore build output
  globalIgnores(["dist"]),

  // base JS recommended rules
  js.configs.recommended,

  {
    files: ["**/*.{js,jsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooks,
      "jsx-a11y": jsxA11y,
      prettier: prettierPlugin,
    },
    rules: {
      // bring in recommended rules from plugin objects
      ...reactPlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,

      // disable ESLint rules that conflict with Prettier
      ...prettierConfig.rules,
      "prettier/prettier": "error",
      "max-len": "off",

      "react/prop-types": "off",

      // convenience for React 17+
      "react/react-in-jsx-scope": "off",
    },
    settings: { react: { version: "detect" } },
  },
]);
