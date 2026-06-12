const { expect } = require('@playwright/test')

class GaragePage {
  constructor(page) {
    this.page = page
    this.garageTitle = page.getByRole('heading', { name: 'Garage' })
    this.addCarButton = page.getByRole('button', { name: 'Add car' })
  }

  async expectGaragePageOpened() {
    await expect(this.garageTitle).toBeVisible()
  }

  async openAddCarModal() {
    await this.addCarButton.click()
  }
}

module.exports = GaragePage