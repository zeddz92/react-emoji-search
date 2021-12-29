import dts from "rollup-plugin-dts";
import esBuild, { minify } from "rollup-plugin-esbuild";
import postcss from "rollup-plugin-postcss";

import pkg from "./package.json";

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
      esBuild({ minify: true }),
      postcss({
        minimize: true,
        inject: true,
      }),
      {
        name: "Use style-inject commonJS module`",
        generateBundle: (_, bundle) => {
          Object.entries(bundle).forEach((entry) => {
            bundle[entry[0]].code = entry[1].code.replace(
              "style-inject.es.js",
              "style-inject.js"
            );
            bundle[entry[0]].code = entry[1].code.replace(
              "../node_modules/",
              ""
            );
          });
        },
      },
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
