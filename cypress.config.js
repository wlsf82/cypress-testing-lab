const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,

  e2e: {
    baseUrl: 'https://cypress-playground.s3.eu-central-1.amazonaws.com',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
