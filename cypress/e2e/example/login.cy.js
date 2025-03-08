import Pages from '../../pageObjects/index';

const { LoginPage } = Pages.Example;

describe('Example - Login', () => {

  beforeEach(() => {
    cy.fixture('example/users').then((users) => {
      cy.generalExampleLogin(
        users.standard.username,
        users.standard.password
      )
    });
  });

  it('LO001 - Verify the user is able to login with valid user',
    { tags: ['@exampleSanity'] },
    () => {
      LoginPage.verifyProductsPageIsDisplayed();
    }
  );

});
