/*
import { test, expect } from "@playwright/test";

// Broken test #1 — wrong locator

test("login should redirect to inventory", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await page.getByPlaceholder("Username").fill("standard_user");   // ← is this the real placeholder?
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page).toHaveURL(/inventory/);
});
// Fix report template

// Root cause:     Placeholder text for the username field was incorrect
// Fix:            Changed placeholder text to "Username"
// How I verified: Ran the test, and checked that it now passes and redirects to the inventory page after login

// Broken test #2 — wrong expected text

test("error message on wrong password", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("wrong_password");
  await page.getByRole("button", { name: "Login" }).click();

  await expect(page.locator('[data-test="error"]')).toHaveText("Epic sadface: Username and password do not match any user in this service");
  // ← is this the exact text?)
});

// Fix report template

// Root cause:      Error message text was incorrect and locator for error message was not specific enough
// Fix:             Changed the text to match the actual error message and used another locator for the error message
// How I verified:  Ran the test, and checked that it now passes with the correct error message

// Broken test #3 — missing await

test("cart badge appears after adding product", async ({ page }) => {
  await page.goto("https://www.saucedemo.com");
  await page.getByPlaceholder("Username").fill("standard_user");
  await page.getByPlaceholder("Password").fill("secret_sauce");
  await page.getByRole("button", { name: "Login" }).click();

  await page.locator("[data-test=\"add-to-cart-sauce-labs-backpack\"]").click();   // ← something missing here

  await expect(page.locator(".shopping_cart_badge")).toHaveText("1");
});

// Fix report template

//Root cause:       Missing an await before the click AddToCart button
// Fix:             Added an await before the click action on the AddToCart button
// How I verified:  Ran the test, and checked that it now passes and the cart badge appears with the correct count after adding a product

*/