const path = require('path');

module.exports = {
  entry: './src/wa-chat-widget.js',
  output: {
    filename: 'wa-chat-widget.js',
    path: path.resolve(__dirname, 'dist'),
    library: {
      name: 'WaChatWidget',
      type: 'umd',
      export: 'default',
    },
    globalObject: 'this'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  }
};