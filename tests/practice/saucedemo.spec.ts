/*

import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { users, errorMessages, checkoutInfo } from '../../test-data/users';


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


  // Task 1 — Login (happy path)
  test('Task 1 — Login (happy path)', async () => {
  await loginPage.loginAs(users.standard);

  await inventoryPage.expectToBeOpened();
});

  // Task 2 - Negative login
test('Task 2 - Login with wrong password', async () => {
  await loginPage.loginAs(users.wrongPassword);

  await expect(loginPage.errorMessage).toHaveText(errorMessages.wrongCredentials);
});

  // Task 3 - Add product to cart
  test('Task 3 - Add product to cart', async ({ page }) => {
    await loginPage.loginAs(users.standard);

    await inventoryPage.addToCart('sauce-labs-backpack');

    await expect(inventoryPage.cartBadge, 'Cart badge should show 1 after adding a product').toHaveText('1');
});

  // Task 4 - Remove product from cart
  test('Task 4 - Remove product from cart', async ({ page }) => {
    await loginPage.loginAs(users.standard);

    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.removeFromCart('sauce-labs-backpack');

    await expect(inventoryPage.cartBadge, 'Cart badge should not be visible after removing product').not.toBeVisible();
  });

  // Task 5 - Username/Password/Nothing only validation
test('Task 5.1 - Empty fields validation', async () => {
  await loginPage.loginButton.click();

  await expect(loginPage.errorMessage).toHaveText(errorMessages.usernameRequired);
});

test('Task 5.2 - Username only validation', async () => {
  await loginPage.usernameInput.fill(users.standard.username);
  await loginPage.loginButton.click();

  await expect(loginPage.errorMessage).toHaveText(errorMessages.passwordRequired);
});

test('Task 5.3 - Password only validation', async () => {
  await loginPage.passwordInput.fill(users.standard.password);
  await loginPage.loginButton.click();

  await expect(loginPage.errorMessage).toHaveText(errorMessages.usernameRequired);
});


 // Bonus Tasks
  // Task 6 - multiple products in cart
  test('Task 6 - multiple products in cart', async ({ page }) => {
    await loginPage.loginAs(users.standard);
    await inventoryPage.expectToBeOpened();

    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.addToCart('sauce-labs-bike-light');
    await inventoryPage.addToCart('sauce-labs-bolt-t-shirt');
    await expect(inventoryPage.cartBadge, 'Cart badge should show 3 after adding three products').toHaveText('3');

    await inventoryPage.removeFromCart('sauce-labs-bike-light');
    await expect(inventoryPage.cartBadge).toHaveText('2');
  });

  // Task 7 - sorting z-a

  test('Task 8 - sorting z-a', async ({ page }) => {
    await loginPage.loginAs(users.standard);
    await inventoryPage.expectToBeOpened();

    await page.locator('[data-test="product-sort-container"]').selectOption('za');
    await page.getByText('This classic Sauce Labs t-').click();
  });

  // Task 8 - cart after refresh

  test('Task 9 - cart after refresh', async ({ page }) => {
    await loginPage.loginAs(users.standard);
    await inventoryPage.expectToBeOpened();
    await inventoryPage.addToCart('sauce-labs-bike-light');
    await expect(inventoryPage.cartBadge, 'Cart badge should show 1 after adding one product').toHaveText('1');

    await page.reload();
    await expect(inventoryPage.cartBadge, 'Cart badge should show 1 after refreshing the page').toHaveText('1');

  });

  // Task 9 - BUG - Bike Light should remain visible after removing Backpack
  test('Task - 7 bike light stays in cart after removing backpack', async ({ page }) => {
    await loginPage.loginAs(users.standard);
    await inventoryPage.expectToBeOpened();

    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.addToCart('sauce-labs-bike-light');
    await expect(inventoryPage.cartBadge, 'Cart badge should show 2 after adding two products').toHaveText('2');

    await inventoryPage.openCart();
    await expect(cartPage.itemNames).toHaveCount(2);

    await cartPage.removeFromCart('sauce-labs-backpack');
    await cartPage.openCart();

    await page.screenshot({ path: 'cart-after-remove.png', fullPage: true });

    await expect(cartPage.cartBadge, 'Cart badge should show 1 after removing backpack').toHaveText('1');
    await expect(cartPage.itemNames).toHaveText(['Sauce Labs Bike Light']);
  });


    // Task Week 5 - locked_out_user (negative testgit)
   // Task 10 - Week 5 - locked_out_user (negative test)
  test('Task 10 - locked_out_user', async ({ page }) => {
    // comment for conflict 2222222222222
    await loginPage.loginAs(users.lockedOut);

    await expect(loginPage.errorMessage).toHaveText(errorMessages.lockedOut);
  });

  // Task 11  - Checkout flow
  test('Test 11 - Checkout flow', async ({page})=> {
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

*/