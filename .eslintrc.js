module.exports = {
  env: {
    browser: true,
    es2021: true,
    jest: true,
  },
  extends: [
    "plugin:react/recommended",
    "airbnb",
    "plugin:prettier/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "react-hooks", "unused-imports"],
  rules: {
    // 2 - это warning, identMode 4 - отступ равен 4 пробелам
    // 'react/jsx-indent': [2, {indentMode: 4, ignoreTernaryOperator: true}],
    // Идентичная запись
    "react/jsx-filename-extension": [
      2,
      {
        extensions: [".js", ".jsx", ".tsx"],
      },
    ],
    // в проекте используются относительные пути
    "import/no-unresolved": "off",
    // Правило указывать расширение пути. Но webpack уже настроен и правило не нужно
    "import/extensions": "off",
    "import/prefer-default-export": "off",
    "no-unused-vars": "warn",
    // не обязательно импортировать React с 17й версии
    "react/react-in-jsx-scope": "off",
    "react/require-default-props": "off",
    "react/jsx-props-no-spreading": "warn",
    "react/function-component-definition": "off",
    "no-shadow": "off",
    // проверить что это и возможно нужно вернуть
    "import/no-extraneous-dependencies": "off",
    "no-underscore-dangle": "off",
    // accessibility
    "jsx-a11y/label-has-associated-control": "off",
    "jsx-a11y/click-events-have-key-events": "off",
    "jsx-a11y/no-noninteractive-element-interactions": "off",
    "max-len": [
      "error",
      {
        ignoreComments: true,
        code: 120,
      },
    ],
    "jsx-a11y/no-static-element-interactions": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "no-param-reassign": "off",
    "no-undef": "off",
    "react/no-array-index-key": "off",
    "import/order": [
      "error",
      {
        "newlines-between": "always",
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
          "object",
        ],

        pathGroups: [
          {
            pattern: "react**",
            group: "external",
            position: "before",
          },
          {
            pattern: "@**/**",
            group: "external",
            position: "before",
          },
          {
            pattern: "@**",
            group: "external",
            position: "before",
          },
          {
            pattern: "*.+(scss|json)",
            group: "index",
            patternOptions: { matchBase: true },
            position: "after",
          },
        ],
        pathGroupsExcludedImportTypes: ["react"],
        alphabetize: {
          order: "asc",
        },
      },
    ],
    "unused-imports/no-unused-imports": "error",
    "react/jsx-max-props-per-line": ["error", { maximum: 3 }],
  },
  globals: {
    __IS_DEV__: true,
    __API__: true,
    __PROJECT__: true,
  },
  overrides: [
    {
      files: ["**/src/**/*.{test,stories}.{ts,tsx}"],
      rules: {
        "max-len": "off",
        "import/order": "off",
      },
    },
  ],
};
