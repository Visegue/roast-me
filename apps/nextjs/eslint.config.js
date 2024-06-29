import baseConfig, { restrictEnvAccess } from "@roastme/eslint-config/base";
import nextjsConfig from "@roastme/eslint-config/nextjs";
import reactConfig from "@roastme/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];
