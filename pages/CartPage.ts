import { expect, type Locator, type Page } from "@playwright/test";

export class CartPage {
  getByTestId(arg0: string): any {
    throw new Error('Method not implemented.');
  }
  readonly page: Page;
  readonly itemNames: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.itemNames = page.getByTestId("inventory-item-name");
    this.cartBadge = page.getByTestId("shopping-cart-badge");
    this.cartLink = page.getByTestId("shopping-cart-link");
    this.continueShoppingButton = page.getByTestId("continue-shopping");
    this.checkoutButton = page.getByTestId("checkout");
  }


  async openCart() {
    await this.cartLink.click();
  }

  async removeFromCart(productId: string) {
    await this.page.getByTestId(`remove-${productId}`).click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  async checkout() {
    await this.checkoutButton.click();
  }
}