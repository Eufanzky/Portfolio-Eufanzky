import { test, expect } from "@playwright/test";

// The nav links are only in the top bar on desktop. Mobile uses the menu.
test.skip(({ isMobile }) => isMobile, "desktop nav only");

for (const [title, id] of [
  ["About", "about"],
  ["Work", "work"],
  ["Contact", "contact"],
]) {
  test(`the ${title} nav link scrolls to its section`, async ({ page }) => {
    await page.goto("/");
    // The sections below the hero are lazy-loaded.
    await expect(page.locator(`#${id}`)).toBeAttached();

    await page
      .getByRole("navigation")
      .getByRole("link", { name: title, exact: true })
      .click();

    await expect(page).toHaveURL(new RegExp(`#${id}$`));
    await expect(page.locator(`#${id}`)).toBeInViewport();
    await expect
      .poll(() => page.evaluate(() => window.scrollY))
      .toBeGreaterThan(0);
  });
}
