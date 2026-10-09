import { test, expect } from '@playwright/test';

test.describe('SauceDemo tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
  });

  // Task 1 — Login (happy path)
  test('Task 1 — Login (happy path)', async ({ page }) => {
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

    await expect(
      page.locator('[data-test="error"]'), 'Error should appear for wrong credentials').toBeVisible();
  });

  // Task 3 - Add product to cart
test('Task 3 - Add product to cart', async ({ page }) => {
  // Login
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  

  // Add Sauce Labs Backpack
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

  // Verify cart badge shows 1
  await expect(page.locator('.shopping_cart_badge'),'Cart badge should show 1 after adding a product').toHaveText('1');
});

// Task 4 - Remove product from cart
test('Task 4 - Remove product from cart', async ({ page }) => {
  // Login
  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  // Add Sauce Labs Backpack
  await page.locator(
    '[data-test="add-to-cart-sauce-labs-backpack"]'
  ).click();

  // Remove Sauce Labs Backpack
  await page.locator(
    '[data-test="remove-sauce-labs-backpack"]'
  ).click();

  // Verify cart badge is no longer visible
  await expect(
    page.locator('.shopping_cart_badge'),
    'Cart badge should not be visible after removing product'
  ).not.toBeVisible();
});

// Task 5 - Username/Password/Nothing only validation
test('Task 5 - Username only validation', async ({ page }) => {
  //await page.getByPlaceholder('Username').fill('standard_user');

  //await page.getByPlaceholder('Password').fill('secret_sauce');

  await page.getByRole('button', { name: 'Login' }).click();

  await expect(
    page.locator('[data-test="error"]'),
    'Error should appear when password is missing'
  ).toBeVisible();
});


///
//Task7 day2......

// Task 7 - BUG - Bike Light should remain visible after removing Backpack

test('Task - 7 bike light stays in cart after removing backpack', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL(/inventory/);

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');

  await page.locator('[data-test="shopping-cart-link"]').click();
  await expect(page.locator('[data-test="inventory-item-name"]')).toHaveCount(2);

  await page.locator('[data-test="remove-sauce-labs-backpack"]').click();
  await page.locator('[data-test="shopping-cart-link"]').click();

  // Screenshot of what the page really shows at this point
  await page.screenshot({ path: 'cart-after-remove.png', fullPage: true });

  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');
  page.pause();
  await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText(['Sauce Labs Bike Light']);
  
});
/////

// Bonus Tasks

// Multiple products

test('multiple products in cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL(/inventory/);

  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
  await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('3');

  await page.locator('[data-test="remove-sauce-labs-bike-light"]').click();
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('2');

  
});

// Sorting Z-A

test('sorting z-a', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL(/inventory/);

  await page.locator('[data-test="product-sort-container"]').selectOption('za');
  await page.getByText('This classic Sauce Labs t-').click();
})

// Cart after refresh

test('cart after refresh', async ({page}) => {
  await page.goto('http://www.saucedemo.com/');
  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();
  await expect(page).toHaveURL(/inventory/);

  await page.locator('[data-test="add-to-cart-sauce-labs-bike-light"]').click();  
  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');

  await page.reload();

  await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveText('1');


})
/////


/////// Task 7 (with timeout...) - User should remain logged in after 30 seconds of inactivity
/*
test('Task 7 - User should remain logged in after 30seconds of inactivity', async ({
  page,
}) => {
  // Login
  await page.goto('https://www.saucedemo.com/');

  await page.getByPlaceholder('Username').fill('standard_user');
  await page.getByPlaceholder('Password').fill('secret_sauce');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL(/inventory/);

  // Add Backpack
  await page.locator(
    '[data-test="add-to-cart-sauce-labs-backpack"]'
  ).click();

  // Add Bike Light
  await page.locator(
    '[data-test="add-to-cart-sauce-labs-bike-light"]'
  ).click();

  // Verify both products are in the cart
  await expect(
    page.locator('.shopping_cart_badge')
  ).toHaveText('2');

  // Wait for 30 seconds without interacting with the page
  await page.waitForTimeout(30_000);

  // Verify the user is still logged in
  await expect(
    page,
    'User should remain on the inventory page after 30 seconds of inactivity'
  ).toHaveURL(/inventory/);

});
*/
////////


});