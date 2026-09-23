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

test("does not preload Framer Motion before the hero renders", async ({
  request,
}) => {
  // Framer Motion is only used by the lazy sections below the fold, so it
  // must not be in the first-load preload list (roadmap step 18). Read the
  // served HTML: once the lazy sections load, Vite adds their preloads
  // (Framer Motion included) to the live page.
  const html = await (await request.get("/")).text();
  const preloads = [
    ...html.matchAll(/<link rel="modulepreload"[^>]*href="([^"]+)"/g),
  ].map(([, href]) => href);

  expect(preloads.some((href) => /vendor-react/.test(href))).toBe(true);
  expect(preloads.filter((href) => /vendor-motion/.test(href))).toEqual([]);
});
