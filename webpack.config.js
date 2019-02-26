const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { LicenseWebpackPlugin } = require('license-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const WorkerPlugin = require('worker-plugin');
const WasmPackPlugin = require('@wasm-tool/wasm-pack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');

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
        test: /\.(mp3|jpg)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(vert|frag)/,
        use: ['raw-loader'],
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
    new CleanWebpackPlugin([
      path.resolve(__dirname, './dist'),
      path.resolve(__dirname, './src/wasm/pkg'),
    ]),
    new WorkerPlugin({
      globalObject: 'self',
    }),
    new WasmPackPlugin({
      crateDirectory: path.resolve(__dirname, './src/wasm'),
    }),
    new WebpackPwaManifest({
      filename: 'manifest.webmanifest',
      name: 'The Camera',
      short_name: 'The Camera',
      description: 'The Camera App works on Browser!',
      background_color: '#000000',
      theme_color: '#000000',
      orientation: 'portrait',
      display: 'standalone',
      ios: {
        'apple-mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-status-bar-style': 'black',
      },
      icons: [
        {
          src: path.resolve(__dirname, './src/assets/app-icon.png'),
          sizes: [120, 152, 167, 180, 1024],
          ios: true,
        },
        {
          src: path.resolve(__dirname, './src/assets/app-icon.png'),
          sizes: [36, 48, 72, 96, 144, 192, 512],
        },
      ],
    }),
  ],
  devServer: {
    host: '0.0.0.0',
    allowedHosts: ['.local'],
  },
};

module.exports = config;
