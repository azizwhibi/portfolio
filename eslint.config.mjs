import js from "@eslint/js";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import react from "eslint-plugin-react";
import jsxA11y from "eslint-plugin-jsx-a11y";
import nextPlugin from "eslint-config-next";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  { files: ["**/*.{ts,tsx}"], languageOptions: { parser: tsParser, parserOptions: { ecmaVersion: "latest", sourceType: "module" }, plugins: { "@typescript-eslint": tseslint }, rules: {} } },
  js.configs.recommended,
  ...nextPlugin,
  {
    plugins: { react, "react-hooks": reactHooks, "jsx-a11y": jsxA11y, "react-refresh": reactRefresh },
    rules: {
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "react/jsx-uses-react": "off",
      "react/jsx-uses-vars": "error",
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "jsx-a11y/img-redundant-alt": "off",
      "jsx-a11y/anchor-is-valid": "off",
    },
  },
];
