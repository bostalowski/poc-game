const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = {
  entry: './src/index.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: 'file-loader'
      },
    ],
  },
  resolve: {
    alias: {
      "@tools": path.resolve(__dirname, 'src/tools/'),
      "@assets": path.resolve(__dirname, 'assets/')
    },
    extensions: [ '.ts', '.js', '.png' ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Poc Game',
      template: 'index.html',
    }),
    new CleanWebpackPlugin()
  ]
};