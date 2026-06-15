import { expect, test } from "@playwright/test";

test("Contains Name", async ({ page }) => {
  await page.goto("http://localhost:4321/");

  // Expect a title "to contain" a substring.
  await expect(page.getByText("Joey Guillaume")).toBeVisible();
});
