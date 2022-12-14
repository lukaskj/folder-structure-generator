import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";

export default {
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "cjs",
    sourcemap: true,
    banner: "#!/usr/bin/env node",
  },
  plugins: [json(), commonjs(), typescript({ module: "ESNext", tsconfig: "tsconfig.build.json" }), resolve()],
};
