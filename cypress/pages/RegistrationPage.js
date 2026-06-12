class RegistrationPage {
  visit() {
    cy.visit('/', {
      auth: {
        username: Cypress.env('login'),
        password: Cypress.env('password'),
      },
    });
  }
  
    openSignUpForm() {
      cy.contains('button', 'Sign up').click();
    }
  
    fillName(name) {
      cy.get('#signupName').clear().type(name);
    }
  
    fillLastName(lastName) {
      cy.get('#signupLastName').clear().type(lastName);
    }
  
    fillEmail(email) {
      cy.get('#signupEmail').clear().type(email);
    }
  
    fillPassword(password) {
      cy.get('#signupPassword').clear().type(password);
    }
  
    fillRepeatPassword(repeatPassword) {
      cy.get('#signupRepeatPassword').clear().type(repeatPassword);
    }
  
    fillRegistrationForm({
      name = 'Yana',
      lastName = 'Test',
      email = `aqa-yana-${Date.now()}@test.com`,
      password = 'Password1',
      repeatPassword = 'Password1',
    } = {}) {
      this.fillName(name);
      this.fillLastName(lastName);
      this.fillEmail(email);
      this.fillPassword(password);
      this.fillRepeatPassword(repeatPassword);
    }
  
    clickRegisterButton() {
      cy.contains('button', 'Register').click();
    }
  
    checkRegisterButtonDisabled() {
      cy.contains('button', 'Register').should('be.disabled');
    }
  
    checkErrorMessage(message) {
      cy.contains(message).should('be.visible');
    }
  
    blurNameField() {
      cy.get('#signupName').focus().blur();
    }
  
    blurLastNameField() {
      cy.get('#signupLastName').focus().blur();
    }
  
    blurEmailField() {
      cy.get('#signupEmail').focus().blur();
    }
  
    blurPasswordField() {
      cy.get('#signupPassword').focus().blur();
    }
  
    blurRepeatPasswordField() {
      cy.get('#signupRepeatPassword').blur();
    }
  }
  
  export default RegistrationPage;