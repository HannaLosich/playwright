import { expect, type Locator, type Page } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly title: Locator;
  readonly cartList: Locator;
  readonly cartItems: Locator;
  readonly itemNames: Locator;
  readonly cartBadge: Locator;
  readonly cartLink: Locator;
  readonly continueShoppingButton: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.title = page.getByTestId("title");
    this.cartList = page.getByTestId("cart-list");
    this.cartItems = page.getByTestId("inventory-item");
    this.itemNames = page.getByTestId("inventory-item-name");
    this.cartBadge = page.getByTestId("shopping-cart-badge");
    this.cartLink = page.getByTestId("shopping-cart-link");
    this.continueShoppingButton = page.getByTestId("continue-shopping");
    this.checkoutButton = page.getByTestId("checkout");
  }

  async expectToBeOpened() {
    await expect(this.page, 'page has "cart" in URL').toHaveURL(/cart/);
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