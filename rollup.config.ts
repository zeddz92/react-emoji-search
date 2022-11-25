import dts from "rollup-plugin-dts";
import esBuild, { minify } from "rollup-plugin-esbuild";
import postcss from "rollup-plugin-postcss";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const pkg = require("./package.json");

// Excluded dependencies
const devExternal = Object.keys(pkg.devDependencies);
const external = Object.keys(pkg.dependencies);

const bundle = (config) => ({
  input: "src/index.ts",
  external: [...devExternal, ...external, /\.js$/],
  ...config,
});

export default [
  bundle({
    plugins: [
      postcss({
        minimize: true,
        inject(cssVariableName) {
          return `import styleInject from 'style-inject';\nstyleInject(${cssVariableName});`;
        },
      }),
      esBuild({ minify: true }),
    ],
    output: [
      {
        file: "dist/index.js",
        sourcemap: true,
        format: "cjs",
      },
      {
        file: "dist/index.mjs",
        sourcemap: true,
        format: "es",
      },
    ],
  }),
  {
    input: "src/data/emojis.js",
    plugins: [minify()],
    output: {
      exports: "auto",
      dir: "dist/data",
      format: "cjs",
    },
  },
  bundle({
    plugins: [dts()],
    external: [/types\//, /\.js$/, /\.css$/],
    output: {
      file: "dist/index.d.ts",
      format: "es",
    },
  }),
];
