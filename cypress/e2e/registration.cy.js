import RegistrationPage from '../pages/RegistrationPage';

describe('Registration form tests with Page Object', () => {
  const registrationPage = new RegistrationPage();

  beforeEach(() => {
    registrationPage.visit();
    registrationPage.openSignUpForm();
  });

  it('Positive: should register user with valid data', () => {
    registrationPage.fillRegistrationForm();

    registrationPage.clickRegisterButton();

    cy.url().should('include', '/panel/garage');
  });

  it('Negative: empty Name field', () => {
    registrationPage.blurNameField();

    registrationPage.checkErrorMessage('Name required');
  });

  it('Negative: short Name', () => {
    registrationPage.fillName('A');
    cy.get('#signupName').blur();

    registrationPage.checkErrorMessage('Name has to be from 2 to 20 characters long');
  });

  it('Negative: invalid Name', () => {
    registrationPage.fillName('12345');
    cy.get('#signupName').blur();

    registrationPage.checkErrorMessage('Name is invalid');
  });

  it('Negative: empty Last Name field', () => {
    registrationPage.blurLastNameField();

    registrationPage.checkErrorMessage('Last name required');
  });

  it('Negative: invalid Email', () => {
    registrationPage.fillEmail('wrongemail');
    cy.get('#signupEmail').blur();

    registrationPage.checkErrorMessage('Email is incorrect');
  });

  it('Negative: empty Password', () => {
    registrationPage.blurPasswordField();

    registrationPage.checkErrorMessage('Password required');
  });

  it('Negative: invalid Password', () => {
    registrationPage.fillPassword('pass');
    cy.get('#signupPassword').blur();

    registrationPage.checkErrorMessage(
      'Password has to be from 8 to 15 characters long'
    );
  });

  it('Negative: passwords do not match', () => {
    registrationPage.fillRegistrationForm({
      password: 'Password1',
      repeatPassword: 'Password2',
    });

    registrationPage.blurRepeatPasswordField();

    registrationPage.checkErrorMessage('Passwords do not match');
  });

  it('Negative: Register button should be disabled', () => {
    registrationPage.fillRegistrationForm({
      name: 'A',
      email: 'wrong',
      password: '123',
      repeatPassword: '123',
    });

    registrationPage.checkRegisterButtonDisabled();
  });
});