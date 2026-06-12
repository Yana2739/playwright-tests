const { test: base, expect } = require('@playwright/test')
const GaragePage = require('../pages/GaragePage')

const test = base.extend({
  userGaragePage: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: 'auth/user.json',
    })

    const page = await context.newPage()
    const userGaragePage = new GaragePage(page)

    await page.goto('/panel/garage')

    await use(userGaragePage)

    await context.close()
  },
})

module.exports = {
  test,
  expect,
}