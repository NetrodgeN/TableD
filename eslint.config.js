import pluginJs from "@eslint/js";
import perfectionist from 'eslint-plugin-perfectionist'
import pluginReact from "eslint-plugin-react";
import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  perfectionist.configs['recommended-alphabetical'],
  {rules: {"react/react-in-jsx-scope": "off",}}
];
