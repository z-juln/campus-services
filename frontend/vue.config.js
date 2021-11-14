const { resolve } = require('path')
const isDev = ['dev', 'mock'].includes(process.env.NODE_ENV)

module.exports = {
  publicPath: './',
  outputDir: resolve('../backend/app/public'),
  css: {
    sourceMap: true,
    loaderOptions: {
      less: {
        modifyVars: {
          hack: `true; @import "${resolve('src/style/vant-hack.less')}";`,
        },
      },
    },
  },
  productionSourceMap: isDev,
  configureWebpack: {
    devtool: isDev ? 'source-map' : undefined,
    resolve: {
      alias: {
        '@': resolve('src'),
        'assets': resolve('src/assets'),
        'components': resolve('src/components'),
        'config': resolve('src/config'),
        'layout': resolve('src/layout'),
        'router': resolve('src/router'),
        'store': resolve('src/store'),
        'utils': resolve('src/utils'),
        'views': resolve('src/views'),
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: '',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/mock': {
        target: 'https://mock.mengxuegu.com/mock/61906777f126df7bfd5b7525/campus-services',
        changeOrigin: true,
        pathRewrite: {
          '^/mock': ''
        }
      },
    }
  }
}
