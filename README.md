# [BF] QA Learning Hub - E2E Automation Template Cypress

This repository is a template for **E2E test automation with Cypress**, developed by the **Blankfactor QA team**.

## Repository Objective

This repository aims to provide a solid foundation for E2E test automation using Cypress, following best coding practices and automation standards. It is designed to be scalable, reusable, and easy to maintain.

---

## Prerequisites

Before starting, ensure you have the following components installed on your system:

- **Node.js and npm**: Cypress is installed via npm. Version `>=22.13.1` is recommended for compatibility. Download it from [here](https://nodejs.org/en/download/).
  
  ```bash
  node -v  # Check Node.js version
  npm -v   # Check npm version
  ```

- **Git**: Required to clone the repository.
  
  ```bash
  git --version
  ```
  
  If not installed, download it from [here](https://git-scm.com/).

---

## Clone the Repository and Set Up the Project

To get a local copy of the project, open the terminal and run:

```bash
cd ~/your_code_dir
git clone https://github.com/qa-learning-hub/e2e-automation-template-cypress.git
cd e2e-automation-template-cypress
npm install
```

To start the project, use:

```bash
npm start
```

---

## Install a Specific Version of Node.js

If you need to install a specific version of Node.js, use the following commands:

```bash
sudo npm cache clean -f
sudo npm install -g n
sudo n 22.13.1
```

> **Note:** If you use `nvm`, you can use the version defined in the `.nvmrc` file.

---

## Project Structure

```
📂 e2e-automation-template-cypress
├── 📂 cypress
│   ├── 📂 e2e            # Directory containing Cypress test cases
│   ├── 📂 fixtures       # JSON files with reusable test data
│   ├── 📂 support        # Custom configurations and commands
├── 📄 cypress.config.js  # Main Cypress configuration file
├── 📄 package.json       # Project dependencies and scripts
```

- **e2e/**: Contains the automated test cases.
- **fixtures/**: JSON files with reusable test data.
- **support/**: Custom methods and commands to improve reusability.
- **cypress.config.js**: Global Cypress configuration.

---

## Coding Standards and Best Practices

### General Guidelines
- Each test case should belong to a proper test suite and be tagged accordingly (`sanity`, `regression`, etc.).
- No assumptions should be made about system state or preconditions.
- Use proper selectors to identify elements and map them using the **Page Object Model (POM)**.
- No hard-coded data in test cases—use **fixtures** with appropriate templates and constants only when necessary.
- Avoid duplicate or redundant methods (selectors, page loads, etc.).
- Remove unused imports and unnecessary methods.
- Do not leave `console.log` or `cy.log` statements in the code.
- Ensure meaningful method names; parameters should be clear and understandable.
- Avoid code duplication—create reusable commands if needed.
- Keep spec files small and modular to improve performance and maintainability.
- Avoid ambiguous or confusing variable/method names.
- If a code smell is identified, provide an example with a suggested fix.
- Follow best practices and accept PR feedback constructively.

### Example Test

```js
describe('Login', () => {
  it('Should log in with valid credentials', () => {
    cy.visit('/login');
    cy.get('#username').type('demo_user');
    cy.get('#password').type('secure_password');
    cy.get('button[type=submit]').click();
    cy.contains('Welcome, demo_user').should('be.visible');
  });
});
```

---

## Running Tests

### 🔹 Run tests in interactive mode

```bash
npx cypress open
```

### 🔹 Run tests in headless mode

```bash
npx cypress run
```

### 🔹 Run a specific test

```bash
npx cypress run --spec cypress/e2e/login.cy.js
```

### 🔹 Run tests in different environments

```bash
npx cypress run --env env=qa
```

---

## Available Scripts

The `package.json` file contains the following useful scripts:

### 🔹 Run tests in graphical mode

```bash
npm run start
```

### 🔹 Run tests in headless mode

```bash
npm run test
```

### 🔹 Run tests with different configurations:

```bash
npm run test:qa      # Run tests in QA environment
npm run test:staging # Run tests in Staging environment
npm run test:prod    # Run tests in Production environment
```

Example configuration in `package.json`:

```json
"scripts": {
  "start": "npx cypress open",
  "test": "npx cypress run",
  "test:qa": "npx cypress run --env env=qa",
  "test:staging": "npx cypress run --env env=staging",
  "test:prod": "npx cypress run --env env=production"
}
```

---

## Running Tests in Jenkins

To run tests in Jenkins:

1. Go to *Jenkins URL*.
2. Click on `Build with Parameters`.
3. Specify:
   - `branchName`
   - `environment` (`qa`, `staging`, `production`)
   - `browser` (currently only Chrome is supported)
   - `nodeVersion`
4. Click `Build`.

After execution, you can find the HTML report attached to each run.

---

## Additional Resources

📌 Official Cypress Documentation: [https://docs.cypress.io](https://docs.cypress.io)

📌 Video tutorial in Spanish: [Watch on YouTube](https://www.youtube.com/watch?v=YdTlhb02L2I\&utm_source=chatgpt.com)

---

### Ready to Get Started?

Follow the steps and start running automation tests with **Cypress**. 🚀

📌 *If you encounter issues, check the documentation or open an issue in this repository.*

