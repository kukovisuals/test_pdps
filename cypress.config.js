const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    chromeWebSecurity: false,
    viewportWidth: 375,
    viewportHeight: 667,
    // viewportWidth: 1309,
    // viewportHeight: 726,
    baseUrl: 'http://127.0.0.1:3005',
    video:false,

  },
  reporter: 'mochawesome',
});
