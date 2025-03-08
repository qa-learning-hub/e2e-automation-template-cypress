export default class SharedComponentsPage {

    get pageTitle() {
        return '.title'
    }

    verifyPageLoaded(url) {
        cy.get(this.pageTitle, { timeout: 40000 }).should('be.visible');
        cy.url().should('include', url);
    }
}