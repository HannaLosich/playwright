import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { users, errorMessages, checkoutInfo } from '../test-data/users';


test.describe('SauceDemo tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.open();
  });



  // Task 1 - after sorting z-a - Test.allTheThings() T-Shirt (Red) is the 1st item

  test('Task 1 - after sorting z-a - Test.allTheThings() T-Shirt (Red) is the 1st item', async ({ page }) => {
    await loginPage.loginAs(users.standard);
    await inventoryPage.expectToBeOpened();

    await inventoryPage.sortBy('za');

    await expect(inventoryPage.itemNames, 'All 6 products should be displayed').toHaveCount(6);
    await expect(inventoryPage.itemNames.first(), 'First product after Z-A sorting is Test.allTheThings() T-Shirt').toHaveText('Test.allTheThings() T-Shirt (Red)');
  });

    // Task 2 - sorting by price (low to high)
  test('Task 2 - sorting by price (low to high)', async () => {
    await loginPage.loginAs(users.standard);
    await inventoryPage.expectToBeOpened();

    await inventoryPage.sortBy('lohi');
    await expect(inventoryPage.sortDropdown, 'Sort option "low to high" is selected').toHaveValue('lohi');
    await expect(inventoryPage.itemPrices, 'All 6 products are displayed').toHaveCount(6);

    const prices = await inventoryPage.getPrices();
    const expectedOrder = [...prices].sort((a, b) => a - b);

    expect(prices, 'Prices is in ascending order').toEqual(expectedOrder);
  });

});