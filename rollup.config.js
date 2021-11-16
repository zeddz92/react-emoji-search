import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import pkg from "./package.json";
import postcss from "rollup-plugin-postcss";

import { terser } from "rollup-plugin-terser";

// Array of extensions to be handled by babel
const EXTENSIONS = [".ts", ".tsx"];

// Excluded dependencies
const EXTERNAL = Object.keys(pkg.devDependencies);

export default {
  input: ["src/index.tsx"],
  output: {
    dir: "dist",
    sourcemap: true,
    format: "esm",
    preserveModules: true,
  },
  plugins: [
    peerDepsExternal(),
    resolve({
      mainFields: ["module", "main", "jsnext:main", "browser"],
      extensions: [...EXTENSIONS, ".css"],
    }),
    babel({
      extensions: EXTENSIONS,
      exclude: "./node_modules/**",
    }),
    postcss({ minimize: true }),
    terser(),
  ],
  external: EXTERNAL,
};
