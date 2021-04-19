const path = require('path')
const devMode = process.env.NODE_ENV !== 'production'
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
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
        test: /\.[jt]s[x]?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            babelrc: true
            // presets: [
            //   [
            //     "@babel/preset-env",
            //     { targets: { browsers: "last 2 versions" } } // or whatever your project requires
            //   ],
            //   "@babel/preset-react",
            //   "@babel/preset-typescript"
            // ],
            // plugins: [
            //   ["@babel/plugin-transform-runtime",{
            //     "absoluteRuntime": false,
            //     "corejs": 2,
            //     "helpers": true,
            //     "regenerator": true,
            //     "useESModules": false
            //   }],
            //   // plugin-proposal-decorators is only needed if you're using experimental decorators in TypeScript
            //   // ["@babel/plugin-proposal-decorators", { legacy: true }],
            //   // ["@babel/plugin-proposal-class-properties", { loose: true }],
            //   "react-hot-loader/babel"
            // ]
          }
        }
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
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin()
  ]
}

module.exports = webpackBaseConfig