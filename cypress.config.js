const { defineConfig } = require('cypress');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: '.env' });

const environments = {
  qa: process.env.CYPRESS_BASE_URL_QA || 'https://example.cypress.io',
  staging: process.env.CYPRESS_BASE_URL_STAGING || 'https://example.cypress.io',
  production: process.env.CYPRESS_BASE_URL_PROD || 'https://example.cypress.io'
};

const currentEnv = process.env.CYPRESS_ENV || 'qa';
const envBaseUrl = environments[currentEnv] || environments.qa;

function getFixtureData() {
  if (fs.existsSync('cypress/fixtures/users.json')) {
    return JSON.parse(fs.readFileSync('cypress/fixtures/users.json', 'utf8'));
  }
  return {};
}

const users = getFixtureData();

const mochawesomeConfig = {
  reportDir: path.resolve('cypress/reports', process.env.CYPRESS_BROWSER || 'electron'),
  reportFilename: 'Automation_Report',
  charts: true,
  embeddedScreenshots: true,
  inlineAssets: false,
  saveAllAttempts: true,
  overwrite: false,
  html: true,
  saveJson: true
};

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',
  reporterOptions: mochawesomeConfig,

  e2e: {
    video: false,
    baseUrl: envBaseUrl,
    specPattern: 'cypress/e2e/**/*cy.js',
    viewportHeight: 880,
    viewportWidth: 1400,
    defaultCommandTimeout: 30000,
    pageLoadTimeout: 30000,
    responseTimeout: 30000,
    retries: 1,

    env: {
      generalUsername: process.env.CYPRESS_USER_GENERAL_USERNAME || users.general?.username,
      generalUserPassword: process.env.CYPRESS_USER_GENERAL_PASSWORD || users.general?.password,
      adminUsername: process.env.CYPRESS_ADMIN_USERNAME || users.admin?.username,
      adminPassword: process.env.CYPRESS_ADMIN_PASSWORD || users.admin?.password,
      currentEnv: currentEnv
    },

    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);

      config.env.baseUrl = envBaseUrl;
      return config;
    }
  }
});
