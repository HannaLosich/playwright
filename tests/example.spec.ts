import { test, expect } from '@playwright/test'; // Import test and expect from the Playwright library

test('has title', async ({ page }) => { // Define a test named 'has title' that takes a page object as an argument
  await page.goto('https://playwright.dev/'); // Navigate to the Playwright website

  await expect(page).toHaveTitle(/Playwright/); // Assert that the page title contains the word 'Playwright'
});

test('get started link', async ({ page }) => { // Define another test named 'get started link' that takes a page object as an argument
  await page.goto('https://playwright.dev/'); // Navigate to the Playwright website

  await page.getByRole('link', { name: 'Get started' }).click(); // Find the link with the role 'link' and name 'Get started', and click on it

  await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible(); // Assert that the heading with the role 'heading' and name 'Installation' is visible on the page
});




