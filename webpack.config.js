require('dotenv/config');
const path = require('path');

const clientPath = path.join(__dirname, 'client');
const serverPublicPath = path.join(__dirname, 'server/public');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx']
  },
  entry: clientPath,
  output: {
    path: serverPublicPath
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: clientPath,
        use: {
          loader: 'babel-loader',
          options: {
            plugins: [
              '@babel/plugin-transform-react-jsx'
            ]
          }
        }
      }
    ]
  },
  devtool: 'source-map',
  devServer: {
    host: '0.0.0.0',
    port: '8080',
    publicPath: '/',
    contentBase: serverPublicPath,
    watchContentBase: true,
    stats: 'minimal',
    proxy: {
      '/api': `http://localhost:8080}`
    }
  },
  performance: {
    hints: false
  }
};
