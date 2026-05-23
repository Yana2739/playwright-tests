describe('Registration form tests', () => {

    beforeEach(() => {
      cy.visit('https://guest:welcome2qauto@qauto.forstudy.space/');
      cy.contains('button', 'Sign up').click();
    });
  
    const fillForm = ({
      name = 'Yana',
      lastName = 'Test',
      email = `aqa-yana-${Date.now()}@test.com`,
      password = 'Password1',
      repeatPassword = 'Password1'
    } = {}) => {
  
      cy.get('#signupName').type(name);
      cy.get('#signupLastName').type(lastName);
      cy.get('#signupEmail').type(email);
      cy.get('#signupPassword').type(password);
      cy.get('#signupRepeatPassword').type(repeatPassword);
    };
  
    it('Positive: should register user with valid data', () => {
  
      fillForm();
  
      cy.contains('button', 'Register').click();
  
      cy.url().should('include', '/panel/garage');
    });
  
    it('Negative: empty Name field', () => {
  
      cy.get('#signupName').focus().blur();
  
      cy.contains('Name required').should('be.visible');
    });
  
    it('Negative: short Name', () => {
  
      cy.get('#signupName').type('A').blur();
  
      cy.contains('Name has to be from 2 to 20 characters long')
        .should('be.visible');
    });
  
    it('Negative: invalid Name', () => {
  
      cy.get('#signupName').type('12345').blur();
  
      cy.contains('Name is invalid').should('be.visible');
    });
  
    it('Negative: empty Last Name field', () => {
  
      cy.get('#signupLastName').focus().blur();
  
      cy.contains('Last name required').should('be.visible');
    });
  
    it('Negative: invalid Email', () => {
  
      cy.get('#signupEmail').type('wrongemail').blur();
  
      cy.contains('Email is incorrect').should('be.visible');
    });
  
    it('Negative: empty Password', () => {
  
      cy.get('#signupPassword').focus().blur();
  
      cy.contains('Password required').should('be.visible');
    });
  
    it('Negative: invalid Password', () => {
  
      cy.get('#signupPassword').type('pass').blur();
  
      cy.contains(
        'Password has to be from 8 to 15 characters long'
      ).should('be.visible');
    });
  
    it('Negative: passwords do not match', () => {

        fillForm({
          password: 'Password1',
          repeatPassword: 'Password2'
        });
      
        cy.get('#signupRepeatPassword').blur();
      
        cy.contains('Passwords do not match')
          .should('be.visible');
      });
  
    it('Negative: Register button should be disabled', () => {
  
      fillForm({
        name: 'A',
        email: 'wrong',
        password: '123',
        repeatPassword: '123'
      });
  
      cy.contains('button', 'Register')
        .should('be.disabled');
    });
  
  });