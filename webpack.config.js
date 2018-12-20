const path = require("path")
const webpack = require("webpack")
const ExtractTextPlugin = require("extract-text-webpack-plugin")
const CleanWebpackPlugin = require("clean-webpack-plugin")

module.exports = (env, options) => ({
  entry: {
    'site': [
      path.join(__dirname, 'assets/javascripts/app.js'),
      path.join(__dirname, 'assets/stylesheets/site.scss')
    ]
  },

  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '.webpack'),
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                plugins: function() {
                  return [
                    require("autoprefixer"),
                    require("postcss-flexbugs-fixes")
                  ]
                }
              }
            },
            'sass-loader'
          ]
        })
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin([".webpack"]),
    new ExtractTextPlugin({
      filename: '[name].css'
    })
  ]
});