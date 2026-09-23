import { test, expect } from "@playwright/test";

import { scrollToBottom } from "./helpers";

// What the first load asks for. On a slow phone every early request competes
// with the JavaScript that renders the hero heading (the LCP element).

test("does not download the hidden hero background image", async ({
  page,
}) => {
  // #retrobg covers the whole hero, so a background image there is never
  // seen (roadmap step 15).
  const heroImages = [];
  page.on("request", (request) => {
    const { pathname } = new URL(request.url());
    if (/herobg/.test(pathname)) heroImages.push(pathname);
  });

  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator('link[rel="preload"][as="image"]')).toHaveCount(0);

  await scrollToBottom(page);
  expect(heroImages).toEqual([]);
});
