[BF] QA Learning Hub - E2E Automation Template Cypress

E2E Automation Cypress Template - BLANKFACTOR QA TEAM

# Setup

The following setup is required:

## Initial Project Setup

NOTE: The project implementation is based on
https://www.cypress.io/

### Install node:

NOTE: We are using the latest recommend version of node
https://nodejs.org/en/download/

#### install node to a particular version:

$ sudo npm cache clean -f
$ sudo npm install -g n
$ sudo n 20.11.1

> **Note:** If you use nvm you can use the setup version in `.nvmrc`

### Setup the project:

$ cd ~/your_code_dir
$ git clone [🔗 Repositorio E2E Automation Template - Cypress](https://github.com/qa-learning-hub/e2e-automation-template-cypress.git)
$ cd E2E-AUTOMATION-TEMPLATE-CYPRESS
$ npm install
$ npm start

# Scripts

## Run Integration Tests locally

You can run local tests by specifying either a single spec file or an entire folder.

To run an entire folder, replace `FOLDER` with the desired one:

`npx cypress run './cypress/integration/FOLDER/**/*.cy.js'`

Example: `npx cypress run '.cypress/e2e/**/*cy.js'`

By default, the tests will run on `QA` environment. If you want to change that
you can specify the `environment=<qa/staging/production>`CLI argument

## Run local tests headed (Open mode)

`npm run start` - This command opens Cypress and allows you to select the browser
you want to run tests on and specify the spec file you want to run

## Run local tests headless

`npm run run` - This command will run all the `@exampleSanity` tagged tests and
run them in `Chrome` browser while register the run in Cypress Cloud dashboard.

`npm run test` - Same as above but this command won't do any Cypress Cloud registration.

To trigger runs on different environments, here are some examples you can follow:

`npm run test -- --env environment=qa` - Trigger headless run on `QA`

## Trigger Jenkins pipeline

To trigger a run on Jenkins, follow the next steps:
1. Go to *Jenkins URL*
2. Click on `Build with Parameters`
3. Specify the `branchName`, `environment`, `browser` and `nodeVersion` you want to use
4. Click on `Build`

Note: Currently, the only supported browser is `Chrome`

After the run is completed, you can find the HTML report attached to each run.