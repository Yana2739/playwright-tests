const { test, expect } = require('@playwright/test')

test.describe('Registration form tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')

    await page.getByText('Sign up').click()

    await expect(page.getByText('Registration')).toBeVisible()
  })

  test('Should register a new user with valid data', async ({ page }) => {
    const email = `aqa-yana-${Date.now()}@test.com`

    await page.locator('#signupName').fill('Yana')
    await page.locator('#signupLastName').fill('Test')
    await page.locator('#signupEmail').fill(email)
    await page.locator('#signupPassword').fill('Qwerty123')
    await page.locator('#signupRepeatPassword').fill('Qwerty123')

    await page.getByRole('button', { name: 'Register' }).click()

    await expect(page.getByRole('heading', { name: 'Garage' })).toBeVisible()
  })

  test('Should show error when Name is empty', async ({ page }) => {
    await page.locator('#signupName').focus()
    await page.locator('#signupName').blur()

    await expect(page.getByText('Name required')).toBeVisible()
  })

  test('Should show error when Name has less than 2 characters', async ({ page }) => {
    await page.locator('#signupName').fill('A')
    await page.locator('#signupName').blur()

    await expect(page.getByText('Name has to be from 2 to 20 characters long')).toBeVisible()
  })

  test('Should show error when Last name is empty', async ({ page }) => {
    await page.locator('#signupLastName').focus()
    await page.locator('#signupLastName').blur()

    await expect(page.getByText('Last name required')).toBeVisible()
  })

  test('Should show error when Email is incorrect', async ({ page }) => {
    await page.locator('#signupEmail').fill('wrong-email')
    await page.locator('#signupEmail').blur()

    await expect(page.getByText('Email is incorrect')).toBeVisible()
  })

  test('Should show error when Password is empty', async ({ page }) => {
    await page.locator('#signupPassword').focus()
    await page.locator('#signupPassword').blur()

    await expect(page.getByText('Password required')).toBeVisible()
  })

  test('Should show error when Password does not match requirements', async ({ page }) => {
    await page.locator('#signupPassword').fill('123')
    await page.locator('#signupPassword').blur()

    await expect(
      page.getByText('Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter')
    ).toBeVisible()
  })

  test('Should show error when passwords do not match', async ({ page }) => {
    await page.locator('#signupPassword').fill('Qwerty123')
    await page.locator('#signupRepeatPassword').fill('Qwerty124')
    await page.locator('#signupRepeatPassword').blur()

    await expect(page.getByText('Passwords do not match')).toBeVisible()
  })

  test('Register button should be disabled when data is invalid', async ({ page }) => {
    await page.locator('#signupName').fill('A')
    await page.locator('#signupLastName').fill('Test')
    await page.locator('#signupEmail').fill('wrong-email')
    await page.locator('#signupPassword').fill('123')
    await page.locator('#signupRepeatPassword').fill('123')

    await expect(page.getByRole('button', { name: 'Register' })).toBeDisabled()
  })
})