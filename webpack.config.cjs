const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());
const resolveAppPath = relativePath => path.resolve(appDirectory, relativePath);

// module.exports = { // This was the simple version... hard coding the mode

/**
 * 
 * This is the ruleset from JT
 * 
 * [10:29 AM] JT (Guest)
    import stylesheet from './style.css' assert {​​ type: 'css' }​​;

    can also go to es2019 in web part tsconfig.

{
      test: /\.css|.sass$/,
      exclude: /node_modules/,
      use: [
        { loader: "style-loader" },
        { loader: "css-loader" },
        { loader: "sass-loader" }]
    },
 */




module.exports = ( env, argv ) => ({
  mode: 'development', // switch to production when you package for production - impacts final size of package you import
  target: 'web',
  entry: {
    fpsLibraryV2: path.resolve(__dirname, 'src/index.ts')  // AC's course 09:06 shows 'apollo-missions-service': './lib/index.js'...
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: argv.mode === 'production' ? '[name].[hash].min.js' : '[name].js',  // [name] Comes from entry
    publicPath: '/assets/',
    library: { type: 'amd' },  // Used by SPFx
    clean: true
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    modules: ['node_modules']
  },
  module: {
    rules: [{
      test: /\.tsx|.ts?$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'ts-loader',
          options: {
            happyPackMode: true,
            transpileOnly: true,
          },
        },
      ]
    },
    {
      test: /\.svg/,
      type: 'asset/resource'
    }]
  },
  externals: { // Read webpack documentation - do not want to bundle these into the package
    'react': 'React',
    'react-json-view': 'ReactJson',
  },
  devServer: {
    compress: true,
    hot: true,
    port: 3000,
    static: {
      directory: resolveAppPath('app'),
      publicPath: '/',
    },
  }
});