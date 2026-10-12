import { test, expect } from "@playwright/test";       // 1. Import tools

test.describe("Login page", () => {                     // 2. Group of related tests

  test.beforeEach(async ({ page }) => {                 // 3. Runs before EVERY test
    await page.goto("https://example.com/login");
  });

  test("should show error for wrong password", async ({ page }) => {  // 4. One test case
    //await page.getByPlaceholder("Email").fill("user@test.com");       // 5. Type into field
    await page.getByPlaceholder("Password").fill("wrongpassword");
    await page.getByRole("button", { name: "Login" }).click();        // 6. Click button

    const errorMessage = page.getByText("Invalid credentials");       // 7. Find element
    await expect(errorMessage).toBeVisible();                         // 8. Assert it's visible
  });
});

// in package.json:
// "@playwright/test": "^1.63.0" - package, version 1.63.0
// "@types/node": "^26.6.3"  - Playwright runs on Node.js, and TypeScript needs to understand things provided by Node.js


