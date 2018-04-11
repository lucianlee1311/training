const webpack = require('webpack');
// const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  // entry: [
  //   'react-hot-loader/patch',
  //   './src/index.js'
  // ],
  // entry: {
  //   app: './src/index.js',
  //   // print: './src/print.js'
  // },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
      },
      {
        test: /\.json$/,
        type: 'javascript/auto',
        exclude: /node_modules/,
        use: ['json-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  // output: {
  //   path: __dirname + '/dist',
  //   // path: path.resolve(__dirname, 'dist'),
  //   publicPath: '/',
  //   filename: 'bundle.js'
  //   // filename: '[name].bundle.js',
  // },
  plugins: [
    // new webpack.HotModuleReplacementPlugin(),
    // new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      // template: path.resolve(__dirname, 'src/index.html'),
      // filename: "./index.html"
    })
  ],
  devServer: {
    // contentBase: './dist',
    // hot: true,
    // historyApiFallback: true
  }
};
