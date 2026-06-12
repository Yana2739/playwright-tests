const { test } = require('@playwright/test')
const ProfilePage = require('../pages/ProfilePage')

test.use({
  storageState: 'auth/user.json',
})

test('Should show mocked user profile data', async ({ page }) => {
  const profilePage = new ProfilePage(page)

  const mockedProfile = {
    status: 'ok',
    data: {
      userId: 1,
      photoFilename: 'default-user.png',
      name: 'Yana',
      lastName: 'Automation',
    },
  }

  await page.route('**/api/users/profile', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(mockedProfile),
    })
  })

  await profilePage.open()

  await profilePage.expectProfileName('Yana Automation')
})