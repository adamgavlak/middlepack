const path = require("path")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const ManifestPlugin = require("webpack-manifest-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const postcssPresetEnv = require('postcss-preset-env');
const devMode = process.env.NODE_ENV !== "production"

module.exports = (env, options) => ({
  optimization: {
    minimizer: [
      new UglifyJsPlugin({ cache: true, parallel: true, sourceMap: false }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },

  entry: {
    'assets/site': [
      path.join(__dirname, 'assets/javascripts/app.js'),
      path.join(__dirname, 'assets/stylesheets/site.css')
    ]
  },

  output: {
    filename: devMode ? '[name].js' : '[name].[contenthash].js',
    path: path.resolve(__dirname, '.webpack'),
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader'
        ]
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin([".webpack"]),
    new MiniCssExtractPlugin({filename: devMode ? '[name].css' : '[name].[hash].css'}),
    new ManifestPlugin()
  ]
});