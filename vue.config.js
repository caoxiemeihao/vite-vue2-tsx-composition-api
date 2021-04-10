const path = require('path')

module.exports = {
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
