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

## 🛠️ How to Add a New Test

1. Navigate to the `cypress/e2e/` directory.
2. Create a new `.cy.js` file with a meaningful name.
3. Write your test following best practices (see the next section).
4. Example test:

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

5. Run your test using:
```bash
npx cypress run --spec cypress/e2e/login.cy.js
```

---

## Coding Standards and Best Practices

- Each test case should belong to a **proper test suite** and be tagged accordingly (`sanity`, `regression`, etc.).
- No assumptions should be made about the system state.
- Use **proper selectors** to identify elements and follow the **Page Object Model (POM)**.
- **Avoid hard-coded data**—use `fixtures` for reusable test data.
- Do not create **unused or duplicate methods**.
- Remove **console logs**, **cy logs**, and **unused imports**.
- Do not leave **commented code** in test files.
- Ensure **meaningful method names** and **clear parameter names**.
- Avoid **duplicating code**—create reusable Cypress commands when needed.
- Keep **spec files small and modular**.
- Use **clear and descriptive names** for tests, methods, and variables.
- If a **code smell** is found, provide an example and a suggested fix.
- Follow best practices and **accept PR feedback constructively**.

---

## Advanced Best Practices

### Cross-Browser Testing
- Run tests on multiple browsers:

```bash
npx cypress run --browser chrome
npx cypress run --browser firefox
```

### Performance Optimization
- Run tests in parallel with:

```bash
npx cypress run --parallel
```
> **Note:** These flags can only be used when recording to Cypress Cloud..

- Use **Cypress Dashboard** for better execution tracking.

### Security & Compliance
- Use environment variables for sensitive data instead of hardcoding.
- Example `.env` file:

```env
CYPRESS_USERNAME= ****
CYPRESS_PASSWORD= ****
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

