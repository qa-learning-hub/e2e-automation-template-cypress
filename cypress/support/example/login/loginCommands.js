Cypress.Commands.add('addLoginData', (email, password) => {
    cy.get('#user-name').clear();
    cy.get('#user-name').type(email, { delay: 0 });
    cy.get('#user-name').should('have.value', email);
    cy.get('#password').clear();
    cy.get('#password').type(password, { delay: 0 });
    cy.get('[data-test="login-button"]').click({ force: true });
});

Cypress.Commands.add('generalExampleLogin', (email, password) => {
    cy.visit('/');
    cy.addLoginData(email, password);
    cy.url().should('include', '/');
    cy.getCookies().then((cookies) => {
        Cypress.env('savedCookies', cookies);
    });
    cy.window().then((win) => {
        Cypress.env('savedLocalStorage', JSON.stringify(win.localStorage));
    });
});