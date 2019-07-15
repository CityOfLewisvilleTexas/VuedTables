module.exports = {
  pluginOptions: {
    moment: {
      locales: ["en"]
    }
  },
  publicPath: process.env.NODE_ENV == "production" ? "/gitlocal/cade/autotables/" : "/"
};
