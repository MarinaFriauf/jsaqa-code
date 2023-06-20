const { test, expect } = require("@playwright/test");
const { email, password } = require("../user");
debugger;
test("houldNotAuthenticateWithInvalidData", async ({ page }) => {
  await page.goto("https://netology.ru/?modal=sign_in");
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill("invalid@ex.com");
  await page.getByPlaceholder("Пароль").click();
  await page.getByPlaceholder("Пароль").fill("invalidpassword");
  await page.getByTestId("login-submit-btn").click();
  await expect(page.getByTestId("login-error-hint")).toBeVisible();
});