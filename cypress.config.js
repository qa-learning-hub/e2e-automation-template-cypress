const { defineConfig } = require("cypress");
const path = require('path');
require('dotenv').config();

let envBaseUrl = process.env.SAUCEDEMO_QA;

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: path.resolve(
      'cypress/reports',
      process.env.CYPRESS_BROWSER || 'electron'
    ),
    reportFilename: 'Automation_Report',
    charts:true,
    embeddedScreenshots:true,
    inlineAssets: false,
    saveAllAttempts: true,
    overwrite: false,
    html: true,
    json: true
  },
  e2e:{
    video:false,
    baseUrl:envBaseUrl,
    specPattern: 'cypress/e2e/*cy.js',
    viewportHeight: 880,
    viewportWidth: 1400,
    defaultCommandTimeout: 30000,
    pageLoadTimeout: 30000,
    responseTimeout: 30000,
    retries: 1,
    env: {
      generalUsername: process.env.USER_GENERAL_USERNAME,
      generalUserPassword: process.env.USER_GENERAL_PASSWORD,
      devBaseUrl: process.env.SAUCEDEMO_QA,
    },
    setupNodeEvents(on, config){
      require('cypress-mochawesome-reporter/plugin')(on);
      config.baseUrl = config.env.baseUrl;
      return config;
    }
  }
});