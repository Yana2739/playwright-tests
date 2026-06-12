const { expect } = require('@playwright/test')

class ProfilePage {
  constructor(page) {
    this.page = page
    this.profileName = page.locator('.profile_name')
  }

  async open() {
    await this.page.goto('/panel/profile')
  }

  async expectProfileName(name) {
    await expect(this.profileName).toHaveText(name)
  }
}

module.exports = ProfilePage