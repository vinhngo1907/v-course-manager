import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

import unusedImports from "eslint-plugin-unused-imports";
import sonarjs from "eslint-plugin-sonarjs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  {
    plugins: {
      "unused-imports": unusedImports,
      sonarjs: sonarjs,
    },
    rules: {
      // ✅ remove unused imports automatically
      "unused-imports/no-unused-imports": "error",

      // ✅ remove unused variables
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],

      // ⚠️ detect commented-out code
      "sonarjs/no-commented-code": "warn",
    },
  },
];

export default eslintConfig;