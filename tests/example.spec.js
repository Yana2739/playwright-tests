const { test, expect } = require('@playwright/test')

test('Open qauto homepage', async ({ page }) => {

  await page.goto('/')

  await expect(page).toHaveTitle(/Hillel Qauto/)

})