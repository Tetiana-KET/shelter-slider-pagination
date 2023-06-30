const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name][contenthash].js',
    assetModuleFilename: '[name][ext]',
    clean: true
  },
  performance: {
    hints: false,
    maxAssetSize: 512000,
    maxEntrypointSize: 512000
  },
  devServer: {// npx webpack serve запустить сервер
    port: 9000,
    compress: true,// сжимать файлы перед отображением
    hot: true,// если будем менять чтото внутри папки дист перегрузить сервер
    static: { // какие статические файлы показывать на станице сервера
      directory: path.join(__dirname, 'dist')
    }
  },
  module: {
    rules: [
      {
        // Это правило будет применяться ко всем файлам,
        // имя которых подойдет под регулярное выражение:
        test: /\.css$/,
        // Список лоадеров, которые применятся к файлу:
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            // Лоадеру можно передать параметры:
            options: { modules: true }
          }
        ]
      },
      // для обработки статических ресурсов достаточно указать type: 'asset'
      {
        test: /\.(jpe?g|png|gif|svg|eot|ttf|woff?2)$/i,
        type: 'asset'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Minesweeper',
      filename: 'index.html',
      template: './src/index.html'// будет брать шаблонный index.html и в него подключать все скрипты и положет его в папку dist
    })
  ]

};