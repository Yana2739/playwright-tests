const { test } = require('@playwright/test')
const RegistrationPage = require('../pages/RegistrationPage')

test.describe('Registration form tests with POM', () => {
  let registrationPage

  test.beforeEach(async ({ page }) => {
    registrationPage = new RegistrationPage(page)

    await registrationPage.open()
    await registrationPage.openRegistrationForm()
  })

  test('Should register a new user with valid data', async () => {
    const email = `aqa-yana-${Date.now()}@test.com`

    await registrationPage.registerUser({
      name: 'Yana',
      lastName: 'Test',
      email,
      password: 'Qwerty123',
      repeatPassword: 'Qwerty123'
    })

    await registrationPage.expectGaragePageOpened()
  })

  test('Should show error when Name is empty', async () => {
    await registrationPage.nameInput.focus()
    await registrationPage.nameInput.blur()

    await registrationPage.expectErrorMessage('Name required')
  })

  test('Should show error when Name has less than 2 characters', async () => {
    await registrationPage.nameInput.fill('A')
    await registrationPage.nameInput.blur()

    await registrationPage.expectErrorMessage(
      'Name has to be from 2 to 20 characters long'
    )
  })

  test('Should show error when Last name is empty', async () => {
    await registrationPage.lastNameInput.focus()
    await registrationPage.lastNameInput.blur()

    await registrationPage.expectErrorMessage('Last name required')
  })

  test('Should show error when Email is incorrect', async () => {
    await registrationPage.emailInput.fill('wrong-email')
    await registrationPage.emailInput.blur()

    await registrationPage.expectErrorMessage('Email is incorrect')
  })

  test('Should show error when Password is empty', async () => {
    await registrationPage.passwordInput.focus()
    await registrationPage.passwordInput.blur()

    await registrationPage.expectErrorMessage('Password required')
  })

  test('Should show error when Password does not match requirements', async () => {
    await registrationPage.passwordInput.fill('123')
    await registrationPage.passwordInput.blur()

    await registrationPage.expectErrorMessage(
      'Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter'
    )
  })

  test('Should show error when passwords do not match', async () => {
    await registrationPage.passwordInput.fill('Qwerty123')
    await registrationPage.repeatPasswordInput.fill('Qwerty124')
    await registrationPage.repeatPasswordInput.blur()

    await registrationPage.expectErrorMessage('Passwords do not match')
  })

  test('Register button should be disabled when data is invalid', async () => {
    await registrationPage.nameInput.fill('A')
    await registrationPage.lastNameInput.fill('Test')
    await registrationPage.emailInput.fill('wrong-email')
    await registrationPage.passwordInput.fill('123')
    await registrationPage.repeatPasswordInput.fill('123')

    await registrationPage.expectRegisterButtonDisabled()
  })
})