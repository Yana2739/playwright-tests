const { test, expect } = require('@playwright/test')

test('Login and save storage state', async ({ page }) => {
  await page.goto('/')

  await page.getByText('Sign In').click()

  await page.locator('#signinEmail').fill(process.env.USER_EMAIL)
  await page.locator('#signinPassword').fill(process.env.USER_PASSWORD)

  await page.getByRole('button', { name: 'Login' }).click()

  await expect(page.getByRole('heading', { name: 'Garage' })).toBeVisible()

  await page.context().storageState({
    path: 'auth/user.json',
  })
})