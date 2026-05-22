import { FlatCompat } from "@eslint/eslintrc";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

/**
 * Flat ESLint config — Next 15 style.
 *
 * The build still runs `next lint` internally; this file makes
 * `pnpm lint` work non-interactively at the CLI as well, sharing the
 * exact same `next/core-web-vitals` ruleset.
 */
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

export default [
  ...compat.extends("next/core-web-vitals"),
  {
    ignores: [".next/**", "out/**", "node_modules/**", "next-env.d.ts"],
  },
];
