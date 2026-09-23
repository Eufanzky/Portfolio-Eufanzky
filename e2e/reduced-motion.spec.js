import { test, expect } from "@playwright/test";

import { scrollToBottom } from "./helpers";

test.describe("with the default motion setting", () => {
  test.use({ reducedMotion: "no-preference" });

  test("the hero scroll dot keeps bouncing", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator(".hero-scroll-dot")).toHaveCSS(
      "animation-iteration-count",
      "infinite"
    );
  });
});

test.describe("when the visitor asks for reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("stops the hero animations and still shows every section", async ({
    page,
  }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

    for (const selector of [".hero-scroll-dot", "#retrobg-sun"]) {
      await expect(page.locator(selector)).toHaveCSS(
        "animation-iteration-count",
        "1"
      );
    }

    // The floor grid keeps its perspective tilt with the animation stopped.
    await expect(page.locator("#retrobg-lines")).not.toHaveCSS(
      "transform",
      "none"
    );

    await scrollToBottom(page);
    for (const name of ["Overview.", "Experience.", "Projects.", "Contact."]) {
      const heading = page.getByRole("heading", { name, exact: true });
      await heading.scrollIntoViewIfNeeded();
      await expect(heading).toBeVisible();
    }
  });
});
