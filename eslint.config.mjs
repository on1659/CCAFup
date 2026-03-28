import { FlatCompat } from "/Users/radar/Work/CCAFup/node_modules/.pnpm/@eslint+eslintrc@3.3.5/node_modules/@eslint/eslintrc/dist/eslintrc.cjs";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [".next/**", "out/**", "build/**", "next-env.d.ts"],
  },
];

export default eslintConfig;
