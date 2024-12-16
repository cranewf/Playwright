const { test, expect } = require("@playwright/test");
const { email, password } = require("../user");

test("Successful authorization", async ({ page }) => {
  await page.goto("https://netology.ru/");
  await page.click("text=Войти");
  await page.fill('[placeholder="Email"]', email);
  await page.fill('[placeholder="Пароль"]', password);
  await page.click('button:has-text("Войти")');

  await expect(
    page.locator(
      ".------libs-shared-src-reallyShared-components-User--profileButton--wAw6v"
    )
  ).toContainText("Моё обучение");
});

test("Failed authorization", async ({ page }) => {
  await page.goto("https://netology.ru/");
  await page.click("text=Войти");
  await page.getByPlaceholder("Email").click();
  await page.getByPlaceholder("Email").fill(email);
  await page.getByPlaceholder("Пароль").click();
  await page.getByPlaceholder("Пароль").fill("password");
  await page.getByTestId("login-submit-btn").click();

  await expect(page.locator(".hint_hint__bpsEa.inputHint")).toContainText(
    "Вы ввели неправильно логин или пароль."
  );
});
