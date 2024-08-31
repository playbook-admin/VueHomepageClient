const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    optimization: {
      usedExports: false, // Disable tree shaking
    }
  }
});
