const { expect } = require('@playwright/test')

class RegistrationPage {
  constructor(page) {
    this.page = page

    this.signUpButton = page.getByText('Sign up')
    this.registrationTitle = page.getByText('Registration')

    this.nameInput = page.locator('#signupName')
    this.lastNameInput = page.locator('#signupLastName')
    this.emailInput = page.locator('#signupEmail')
    this.passwordInput = page.locator('#signupPassword')
    this.repeatPasswordInput = page.locator('#signupRepeatPassword')
    this.registerButton = page.getByRole('button', { name: 'Register' })
  }

  async open() {
    await this.page.goto('/')
  }

  async openRegistrationForm() {
    await this.signUpButton.click()
    await expect(this.registrationTitle).toBeVisible()
  }

  async registerUser({ name, lastName, email, password, repeatPassword }) {
    await this.nameInput.fill(name)
    await this.lastNameInput.fill(lastName)
    await this.emailInput.fill(email)
    await this.passwordInput.fill(password)
    await this.repeatPasswordInput.fill(repeatPassword)
    await this.registerButton.click()
  }

  async expectGaragePageOpened() {
    await expect(this.page.getByRole('heading', { name: 'Garage' })).toBeVisible()
  }

  async expectErrorMessage(message) {
    await expect(this.page.getByText(message)).toBeVisible()
  }

  async expectRegisterButtonDisabled() {
    await expect(this.registerButton).toBeDisabled()
  }
}

module.exports = RegistrationPage