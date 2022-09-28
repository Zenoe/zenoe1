const commonPaths = require('./common-paths')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// React-Hot-Loader replacer
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')
function resolveAt (dir) {
  return path.join(__dirname, '..', dir)
}

const config = (env = 'dev') => ({
  entry: {
    app: './src/index.js',
    vendor: ['axios', 'react', 'react-dom']
  },
  output: {
    path: commonPaths.outputPath,
    publicPath: '/'
  },
  // resolve: {
  //   modules: [
  //     path.resolve(__dirname, 'node_modules'),
  //     path.resolve(__dirname, './'),
  //   ],
  // },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        resolve: {
          extensions: ['.js', '.jsx'],
          alias: {
            '@': resolveAt('src')
          }
        },
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [env === 'dev' && require.resolve('react-refresh/babel')].filter(Boolean)
          }
        }
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        exclude: /node_modules/,
        use: ['file-loader?name=./static/images/avatar/[name].[ext]']
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader?limit=1024&name=fonts/[name].[ext]'
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: {
                localIdentName: '[name]__[local]___[hash:base64:5]'
              }
            }
          }
        ],
        include: /\.module\.css$/
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true
        },
        vendor: {
          chunks: 'initial',
          test: 'vendor',
          name: 'vendor',
          enforce: true
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'public/index.html',
      favicon: 'public/favicon.ico'
    }),
    env === 'dev' && new ReactRefreshWebpackPlugin()
  ].filter(Boolean) // *conditionally* use a plugin?
})

module.exports = config
