const { test } = require('../fixtures/userGaragePage')

test('User should be logged in and see Garage page', async ({ userGaragePage }) => {
  await userGaragePage.expectGaragePageOpened()
})