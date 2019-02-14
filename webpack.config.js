const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { LicenseWebpackPlugin } = require('license-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

/** @type {import('webpack').Configuration} */
const config = {
  entry: path.resolve(__dirname, './src/index'),
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].[chunkhash:8].js',
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.m?js/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              camelCase: true,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.mp3$/,
        use: ['file-loader'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/index.html'),
    }),
    new LicenseWebpackPlugin({
      addBanner: true,
    }),
    new CleanWebpackPlugin([path.resolve(__dirname, './dist')]),
  ],
  devServer: {
    host: '0.0.0.0',
    allowedHosts: ['.local'],
  },
};

module.exports = config;
