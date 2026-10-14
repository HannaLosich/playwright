import { expect, type Locator, type Page } from "@playwright/test";

export class InventoryPage {
  readonly page: Page;
  readonly cartLink: Locator;
  readonly cartBadge: Locator;
  readonly sortDropdown: Locator;
  readonly itemNames: Locator;
  readonly itemPrices: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartLink = page.getByTestId("shopping-cart-link");
    this.cartBadge = page.getByTestId("shopping-cart-badge");
    this.sortDropdown = page.getByTestId("product-sort-container");
    this.itemNames = page.getByTestId("inventory-item-name");
    this.itemPrices = page.getByTestId("inventory-item-price");
  }

  async expectToBeOpened() {
    await expect(this.page, 'page has "inventory" in URL').toHaveURL(/inventory/);
  }

  async addToCart(productId: string) {
    await this.page.getByTestId(`add-to-cart-${productId}`).click();
  }

  async removeFromCart(productId: string) {
    await this.page.getByTestId(`remove-${productId}`).click();
  }

  async openCart() {
    await this.cartLink.click();
  }

  async sortBy(option: 'az' | 'za' | 'lohi' | 'hilo') {
    await this.sortDropdown.selectOption(option);
  }

  async getPrices(): Promise<number[]> {
    const texts = await this.itemPrices.allTextContents();
    return texts.map((text) => parseFloat(text.replace('$', '')));
  }
}