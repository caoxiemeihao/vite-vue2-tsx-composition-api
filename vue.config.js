const path = require('path')
const px2rem = require('postcss-px2rem')

module.exports = {
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          px2rem({ remUnit: 100 }), // html: font-size: 100px;
        ],
      },
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
      extensions: ['.ts', '.tsx'],
    },
    module: {
      rules: [
        {
          test: /\.(jsx|tsx|ts)$/,
          loader: 'babel-loader',
        },
      ],
    },
  },
}
