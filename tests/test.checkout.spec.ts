import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';
import { users} from '../test-data/users';


test.describe('SauceDemo tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);
    checkoutPage = new CheckoutPage(page);
    await loginPage.open();
  });


  // Task 1  - Checkout flow
  test('Test 1 - Checkout flow', async ({page})=> {
    await loginPage.loginAs(users.standard);
    await inventoryPage.expectToBeOpened();

    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.openCart();
    await cartPage.checkout();

    await checkoutPage.fillInformation('1', '1', '1');
    await checkoutPage.continue();

    await expect(page, 'Checkout Overview page has "checkout-step-two" in URL').toHaveURL(/checkout-step-two/);

    await page.locator('[data-test="finish"]').click();
    await expect(page, 'Checkout Complete page has "checkout-complete" in URL').toHaveURL(/checkout-complete/);
    await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
    await expect(page.locator('[data-test="complete-text"]')).toHaveText('Your order has been dispatched, and will arrive just as fast as the pony can get there!');


});

});