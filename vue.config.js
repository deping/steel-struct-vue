// eslint-disable-next-line @typescript-eslint/no-var-requires
const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "./" : "/",
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === "production") {
      // 为生产环境修改配置...
      config.optimization = {
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              compress: {
                drop_console: true
              }
            }
          })
        ]
      };
    } else {
      // 为开发环境修改配置...
      config.devServer = {
        port: 4200
      };
    }
  },
  css: {
    loaderOptions: {
      scss: {
        // eslint-disable-next-line quotes
        prependData: `@import "@/assets/global.scss";`
      },
    }
  }

};
