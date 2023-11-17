const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    defaultCommandTimeout: 10000,
    browserWebSecurity: false,
    pageLoadTimeout: 60000,
    chromeWebSecurity: false,
    viewportWidth: 390,
    viewportHeight: 844,
    // viewportWidth: 1309,
    // viewportHeight: 726,
    baseUrl: 'https://shop.join-eby.com/',
    video:false,

  },
  reporter: 'mochawesome',
});
