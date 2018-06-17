let path = require('path');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

let conf = {
  entry: './src/js/index.js', // точка входа
  output: {
    path: path.resolve(__dirname, './dist'), // 'dirname' - ссылка на текущую папку
    filename: 'main.js', // итоговый файл
    publicPath: 'dist/' // относительная папка на файл который будет подставляться из браузера
  },
  devServer: {
    overlay: true // выводит сообщения об ошибке на экран
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader'
        // exclude: '/node-modules/'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              bypassOnDebug: true, // webpack@1.x
              disable: true // webpack@2.x and newer
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css')
  ]
};

module.exports = (env, options) => {
  let production = options.mode = 'production';

  conf.devtool = production
    ? 'source-map' // или 'false'  чтоб код было не видно
    : 'eval-sourcemap';
  return conf;
};
