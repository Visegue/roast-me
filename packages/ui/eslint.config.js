import baseConfig from "@roastme/eslint-config/base";
import reactConfig from "@roastme/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [],
  },
  ...baseConfig,
  ...reactConfig,
];
