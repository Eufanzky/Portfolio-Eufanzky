import { test, expect } from "@playwright/test";

import { scrollToBottom } from "./helpers";

test("loads with no console errors and shows every section heading", async ({
  page,
}) => {
  const errors = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));

  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  await scrollToBottom(page);

  for (const name of ["Overview.", "Experience.", "Projects.", "Contact."]) {
    const heading = page.getByRole("heading", { name, exact: true });
    await heading.scrollIntoViewIfNeeded();
    await expect(heading).toBeVisible();
  }

  expect(errors).toEqual([]);
});
