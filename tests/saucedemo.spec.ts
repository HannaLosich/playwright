import { test, expect } from '@playwright/test';

test.describe('SauceDemo tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

  // Task Week 5 - locked_out_user
  test('Task - locked_out_user', async ({ page }) => {
    // comment for conflict 2222222222222
    await page.getByPlaceholder('Username').fill('locked_out_user'); 
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('[data-test="error"]'), 'Epic sadface: Username and password do not match any user in this service').toBeVisible();
  });

  // Task 1 — Login (happy path)
  test.only('Task 1 — Login (happy path)', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page, 'page has "inventory" in URL').toHaveURL(/inventory/);
  });

  // Task 2 - Negative login
  test('Task 2 - Login with wrong password', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('wrong_password');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('[data-test="error"]'), 'Error should appear for wrong credentials').toBeVisible();
  });

  // Task 3 - Add product to cart
  test('Task 3 - Add product to cart', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    await expect(page.locator('.shopping_cart_badge'), 'Cart badge should show 1 after adding a product').toHaveText('1');
  });

  // Task 4 - Remove product from cart
  test('Task 4 - Remove product from cart', async ({ page }) => {
    await page.getByPlaceholder('Username').fill('standard_user');
    await page.getByPlaceholder('Password').fill('secret_sauce');
    await page.getByRole('button', { name: 'Login' }).click();

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();

    await expect(page.locator('.shopping_cart_badge'), 'Cart badge should not be visible after removing product').not.toBeVisible();
  });

  // Task 5 - Username/Password/Nothing only validation
  test('Task 5 - Username only validation', async ({ page }) => {
    await page.getByRole('button', { name: 'Login' }).click();

    await expect(page.locator('[data-test="error"]'), 'Error should appear when password is missing').toBeVisible();
  });

  // Task 7 - BUG - Bike Light should remain visible after removing Backpack
  test('Task - 7 bike light stays in cart after removing backpack', async ({ page }) => {
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page, 'page has "inventory" in URL').toHaveURL(/inventory/);

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]'), 'Cart badge should show 2 after adding two products').toHaveText('2');

    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveCount(2);

    await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();

    await page.screenshot({ path: 'cart-after-remove.png', fullPage: true });

    await expect(page.locator('[data-test="shopping-cart-badge"]'), 'Cart badge should show 1 after removing backpack').toHaveText('1');
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText(['Sauce Labs Bike Light']);
  });

  // Bonus Tasks
  test('multiple products in cart', async ({ page }) => {
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page, 'page has "inventory" in URL').toHaveURL(/inventory/);

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]'), 'Cart badge should show 3 after adding three products').toHaveText('3');

    await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');
  });

  test('sorting z-a', async ({ page }) => {
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page, 'page has "inventory" in URL').toHaveURL(/inventory/);

    await page.locator('[data-test="product-sort-container"]').selectOption('za');
    await page.getByText('This classic Sauce Labs t-').click();
  });

  test('cart after refresh', async ({ page }) => {
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page, 'page has "inventory" in URL').toHaveURL(/inventory/);

    await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    await expect(page.locator('[data-test="shopping-cart-badge"]'), 'Cart badge should show 1 after adding one product').toHaveText('1');

    await page.reload();

    await expect(page.locator('[data-test="shopping-cart-badge"]'), 'Cart badge should show 1 after refreshing the page').toHaveText('1');
  });
});