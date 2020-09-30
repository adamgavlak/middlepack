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
      new UglifyJsPlugin({ cache: true, parallel: true, sourceMap: true }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          map: {
            inline: true, // set to false if you want CSS source maps
            annotation: true
          }
        }
      })
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

  devtool: 'source-maps',

  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1, sourceMap: true } },
          { loader: 'resolve-url-loader' },
          { loader: 'postcss-loader', options: { sourceMap: true } }
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