/*
import { test } from '@playwright/test';

test('count elements using count()', async ({ page }) => {
  await page.goto('https://saucelabs.com/');

  // Click Developers
  await page.getByRole('button', { name: 'Developers' }).click();

  // Find all links
  const links = page.getByRole('link');

  // Count elements
  const count = await links.count();

  console.log(`Found ${count} links`);
});


test('click the 2nd element using nth(1)', async ({ page }) => {
  await page.goto('https://saucelabs.com/');

  // Click Developers
  await page.getByRole('button', { name: 'Developers' }).click();

  // Find all links
  const links = page.getByRole('link');

  // Click the 2nd element
  await links.nth(1).click();
});


test('click by text using filter()', async ({ page }) => {
  await page.goto('https://saucelabs.com/');

  // Click Developers
  await page.getByRole('button', { name: 'Developers' }).click();

  // Find all links
  const links = page.getByRole('link');

  // Filter links by text
  const documentation = links.filter({
    hasText: 'Documentation',
  });

  console.log(
    `Documentation matches: ${await documentation.count()}`
  );

  // Click Documentation
  await documentation.first().click();
});
*/