
const path = require(`path`);
const MomentLocalesPlugin = require(`moment-locales-webpack-plugin`);
module.exports = {
  mode: `development`, // Режим сборки
  entry: `./src/main.js`, // Точка входа приложения
  output: {// Настройка выходного файла
    filename: `bundle.js`,
    path: path.join(__dirname, `public`)
  },
  devtool: `source-map`, // Подключаем sourcemaps
  watch: true,
  devServer: {
    contentBase: path.join(__dirname, `public`), // Где искать сборку
    publicPath: `http://localhost:3000/`, // Веб адрес сборки
    compress: true, // Сжатие
    port: 3000,
    lazy: false,
    liveReload: true,
    // Автоматическая перезагрузка страницы
    // Если не работает по стандартному URLу в браузере ‘http: //localhost:8080’,
    // то добавьте к нему ‘/webpack-dev-server/‘: ‘http: //localhost:8080/webpack-dev-server/'
    watchContentBase: true // следить за обновление js
  },
  plugins: [
    // Оставляем только одну локаль.
    new MomentLocalesPlugin({
      localesToKeep: [`es-us`],
    }),
  ]
};
