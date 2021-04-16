const path = require('path')
const devMode = process.env.NODE_ENV !== 'production'
function resolve(relatedPath) {
  return path.join(__dirname, relatedPath)
}
const webpackBaseConfig = {
  entry: {
    app: resolve('../src/index.tsx'),
  },
  output: {
    path: resolve('../dist'),
    filename: devMode ?'js/[name].[hash].js' : 'js/[name].[contenthash].js',
    chunkFilename: devMode ? 'chunks/[name].[hash:4].js':'chunks/[name].[contenthash].js',
    clean: true,
    // publicPath: './'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
    alias: {
      '@': path.join(__dirname, '../src/'),
      '@utils': path.join(__dirname, '../src/utils'),
      '@components': path.join(__dirname, '../src/components'),
      '@apis': path.join(__dirname, '../src/apis'),
      '@routes': path.join(__dirname, '../src/routes'),
      '@styles': path.join(__dirname, '../src/styles'),
      'react-dom': '@hot-loader/react-dom'
    }
  },
  module: {
    rules: [
      {
        test: /\.ts[x]?$/,
        exclude: /node_modules/,
        include: [resolve('../src')],
        use: ['ts-loader']
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      }
    ]
  }
}

module.exports = webpackBaseConfig