module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:react-hooks/recommended",
    "react-app",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", " node_modules/", "coverage"],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: [
          "**/*.test.ts",
          "**/*.test.tsx",
          "**/testUtils.ts",
          "**/testHelper.tsx",
          "**/__tests__/**/*.[jt]s?(x)",
          "projenrc/**",
          "src/infra/**",
        ],
      },
    ],
    "import/no-unresolved": ["error"],
    "import/order": [
      "warn",
      {
        groups: ["builtin", "external"],
        alphabetize: {
          order: "asc",
          caseInsensitive: true,
        },
      },
    ],
    "no-duplicate-imports": ["error"],
    "no-shadow": ["off"],
    "@typescript-eslint/no-shadow": "off",
    "key-spacing": ["error"],
    "no-multiple-empty-lines": ["error"],
    "@typescript-eslint/no-floating-promises": ["error"],
    "no-return-await": ["off"],
    "@typescript-eslint/return-await": ["error"],
    "no-trailing-spaces": ["error"],
    "dot-notation": ["error"],
    "no-bitwise": ["error"],
    "@typescript-eslint/member-ordering": [
      "error",
      {
        default: [
          "public-static-field",
          "public-static-method",
          "protected-static-field",
          "protected-static-method",
          "private-static-field",
          "private-static-method",
          "field",
          "constructor",
          "method",
        ],
      },
    ],
    "no-relative-import-paths/no-relative-import-paths": [
      "error",
      {
        allowSameFolder: true,
        rootDir: "src",
      },
    ],
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      node: {},
      typescript: {
        project: "./tsconfig.json",
        alwaysTryTypes: true,
      },
    },
  },
};
