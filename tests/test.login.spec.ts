import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { users, errorMessages} from '../test-data/users';


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


  // Task 3 - Username/Password/Nothing only validation
test('Task 3.1 - Empty fields validation', async () => {
  await loginPage.loginButton.click();

  await expect(loginPage.errorMessage).toHaveText(errorMessages.usernameRequired);
});

test('Task 3.2 - Username only validation', async () => {
  await loginPage.usernameInput.fill(users.standard.username);
  await loginPage.loginButton.click();

  await expect(loginPage.errorMessage).toHaveText(errorMessages.passwordRequired);
});

test('Task 3.3 - Password only validation', async () => {
  await loginPage.passwordInput.fill(users.standard.password);
  await loginPage.loginButton.click();

  await expect(loginPage.errorMessage).toHaveText(errorMessages.usernameRequired);
});


});