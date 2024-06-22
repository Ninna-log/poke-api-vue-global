const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 8080,
    open: "http://localhost:8080/home", // It will open the URL automatically
  },
});
