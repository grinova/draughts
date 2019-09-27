var path = require('path')

const srcDir = path.resolve(__dirname, 'src', 'client')
const distDir = path.resolve(__dirname, 'static')

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: path.join(srcDir, 'index.js'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  output: {
    path: distDir,
    filename: 'index.js'
  }
}
