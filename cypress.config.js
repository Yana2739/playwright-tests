const { defineConfig } = require('cypress');
require('dotenv').config();

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.BASE_URL,

    setupNodeEvents(on, config) {

      config.env.login = process.env.LOGIN;
      config.env.password = process.env.PASSWORD;

      return config;
    },
  },
});