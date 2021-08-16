const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  entry:{
    app: path.join(__dirname, 'src/app.js')
  },
  output:{
    filename: '[name].js',
    path: path.join(__dirname, 'public')
  },
  module:{
    rules:
    [
      {
        test: /\.css$/,   // .css로 끝나는 것을 정규식으로 거름
        use:['style-loader', 'css-loader']
      },
      {
        test:/\.vue$/, //.vue로 끝나는 것들
        loader:'vue-loader'
      },
      {
        test: /\.s(c|a)ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            // Requires sass-loader@^7.0.0
            options: {
              implementation: require('sass'),
              indentedSyntax: true // optional
            },
            // Requires sass-loader@^8.0.0
            options: {
              implementation: require('sass'),
              sassOptions: {
                indentedSyntax: true // optional
              },
            },
          },
        ],
      },
    ]
  },
  resolve: {
    alias: {
      "vue$":"vue/dist/vue.esm.js",
      "@":path.join(__dirname, 'src/')
    },
    extensions:['*', '.js', '.vue', '.json']
  },
  plugins:[
      new VueLoaderPlugin(),
  ]
}