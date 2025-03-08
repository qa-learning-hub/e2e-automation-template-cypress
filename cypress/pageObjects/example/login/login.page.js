import SharedComponentsPage from "../sharedComponents/sharedComponents.page";

import { homePageLabel } from '../constants/index'

class LoginPage extends SharedComponentsPage {

    get hamburguerMenuIcon() {
        return '#react-burger-menu-btn'
    }

    verifyProductsPageIsDisplayed() {
        cy.get(this.hamburguerMenuIcon).should('exist')
            .and('be.visible');
        cy.get(this.pageTitle).contains(homePageLabel.TITLE);
    }

}

export default new LoginPage();