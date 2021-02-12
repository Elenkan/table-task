const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
   devServer: {
    contentBase: './dist',
    watchContentBase: true,
    inline: false,
    overlay: true,
    open: true
  },
   module: {
    rules: [
      {
        test: /\.less$/i,
        use: [
          'style-loader',
          {loader: 'css-loader', options: {sourceMap:true }},
          {loader: 'postcss-loader', options: {sourceMap:true }},
          {loader: 'less-loader', options: {sourceMap:true }}
        ]
      }
    ]
  },


});
