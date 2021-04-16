const path = require('path')
const webpack = require('webpack')
const webpackConfigBase = require('./webpack.base.js')
const { merge } = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')
function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}
const webpackProdConfig = {
  mode: 'production',
  output: {
    publicPath: './',
  },
  // devtool: 'cheap-module-souce-map',
  plugins: [
    // 定义环境变量为开发环境
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
      IS_DEVELOPMETN: false,
    }),
    // 将打包后的资源注入到html文件内    
    new HtmlWebpackPlugin({
      // inject: true, // will inject the main bundle to index.html
      template: resolve('../public/index.html')
    }),
    new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
  ],
}

module.exports = merge(webpackConfigBase, webpackProdConfig)