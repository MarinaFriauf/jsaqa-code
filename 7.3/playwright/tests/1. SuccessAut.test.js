const { test, expect } = require("@playwright/test");
const { email, password } = require("../user");
debugger;
test("shouldAuthenticateSuccessfully", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill(email);
  await page.getByPlaceholder("Пароль").click();
  await page.getByPlaceholder("Пароль").fill(password);
  await page.getByTestId("login-submit-btn").click();
  await page.waitForTimeout(10000);
  await expect(page.url()).toBe("https://netology.ru/profile");
  const profileHeader = await page.$eval('h2', (element) => element.textContent);
  expect(profileHeader).toBe('Мои курсы и профессии');
  const profileHeaderElement = page.locator('h2');
  await expect(profileHeaderElement).toBeVisible();
});

