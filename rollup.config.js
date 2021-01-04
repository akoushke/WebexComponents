import serve from "rollup-plugin-serve";
import scss from "rollup-plugin-scss";
import typescript from "@rollup/plugin-typescript";
import commonjs from '@rollup/plugin-commonjs';
import livereload from "rollup-plugin-livereload";
import { eslint } from "rollup-plugin-eslint";
import { nodeResolve } from '@rollup/plugin-node-resolve';


const plugins = [
  nodeResolve({extensions:
    [
    '.mjs',
    '.js',
    '.json',
    '.jsx',
    '.ts',
    '.txs'
    ]}),
    commonjs(),
  typescript(),
  // eslint({
  //   exclude: 'node_modules/**'
  // }),
  scss({
    failOnError: true,output: `dist/css/bundle.css`,
    outputStyle: 'compressed',
    failOnError: true,
    // Search for Sass in third-party packages e.g. Momentum UI
    includePaths: ['node_modules'],
    // Remove Webpack-style imports
    // Webpack-style imports are left in code because Storybook uses Webpack
    importer: (path) => ({file: path[0] === '~' ? path.slice(1) : path}),
  }),
  serve({
    contentBase: "dist",
    historyApiFallback: "/200.html",
    host: "localhost",
    port: 9999,
  }),
  livereload("dist"),
];

export default {
  input: "src/index.tsx",
  output: {
    file: "dist/bundle.js",
    sourcemap: "dist/index.js.map",
    format: "iife",
  },
  plugins: [...plugins],
  
  onwarn: function(warning) {
    // Skip certain warnings

    // should intercept ... but doesn't in some rollup versions
    if ( warning.code === 'THIS_IS_UNDEFINED' ) { return; }

    // console.warn everything else
    console.warn( warning.message );
}
};
