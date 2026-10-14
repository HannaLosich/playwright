import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';

import { users, errorMessages, checkoutInfo } from '../test-data/users';


test.describe('SauceDemo tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let cartPage: CartPage;


  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    cartPage = new CartPage(page);

    await loginPage.open();
  });



  // Task 1 - Add product to cart
  test('Task 1 - Add product to cart', async ({ page }) => {
    await loginPage.loginAs(users.standard);

    await inventoryPage.addToCart('sauce-labs-backpack');

    await expect(inventoryPage.cartBadge, 'Cart badge should show 1 after adding a product').toHaveText('1');
});

  // Task 2 - Remove product from cart
  test('Task 2 - Remove product from cart', async ({ page }) => {
    await loginPage.loginAs(users.standard);

    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.removeFromCart('sauce-labs-backpack');

    await expect(inventoryPage.cartBadge, 'Cart badge should not be visible after removing product').not.toBeVisible();
  });



 // Bonus Tasks
  // Task 3 - multiple products in cart
  test('Task 3 - multiple products in cart', async ({ page }) => {
    await loginPage.loginAs(users.standard);
    await inventoryPage.expectToBeOpened();

    await inventoryPage.addToCart('sauce-labs-backpack');
    await inventoryPage.addToCart('sauce-labs-bike-light');
    await inventoryPage.addToCart('sauce-labs-bolt-t-shirt');
    await expect(inventoryPage.cartBadge, 'Cart badge should show 3 after adding three products').toHaveText('3');

    await inventoryPage.removeFromCart('sauce-labs-bike-light');
    await expect(inventoryPage.cartBadge).toHaveText('2');
  });


  // Task 4 - cart after refresh

  test('Task 4 - cart after refresh', async ({ page }) => {
    await loginPage.loginAs(users.standard);
    await inventoryPage.expectToBeOpened();
    await inventoryPage.addToCart('sauce-labs-bike-light');
    await expect(inventoryPage.cartBadge, 'Cart badge should show 1 after adding one product').toHaveText('1');

    await page.reload();
    await expect(inventoryPage.cartBadge, 'Cart badge should show 1 after refreshing the page').toHaveText('1');

  });

  // Task 5 - BUG - Bike Light should remain visible after removing Backpack
  test('Task 5 - bike light stays in cart after removing backpack', async ({ page }) => {
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




});