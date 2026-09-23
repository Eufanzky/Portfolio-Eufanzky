import { test, expect } from "@playwright/test";

import { scrollToBottom } from "./helpers";

// Three.js, React Three Fiber and drei chunks, the canvas chunks, and the
// 3D models. None of these should load on a phone.
const THREE_D_FILE =
  /\/assets\/(react-three-fiber|three|Stars-|Earth-|Computers-|Loader-)[^/]*\.js$|\.(gltf|bin)$/;

test.skip(({ isMobile }) => !isMobile, "mobile only");

test("no Three.js code or 3D model is downloaded at mobile width", async ({
  page,
}) => {
  // Fails today: StarsCanvas has no mobile check (specs/perf-baseline.md,
  // finding 1). Roadmap step 16 fixes it and removes this line.
  test.fail();

  const threeDFiles = [];
  page.on("request", (request) => {
    const { pathname } = new URL(request.url());
    if (THREE_D_FILE.test(pathname)) threeDFiles.push(pathname);
  });

  await page.goto("/");
  await scrollToBottom(page);
  await page.waitForLoadState("networkidle");

  expect(threeDFiles, "3D files requested on mobile").toEqual([]);
});
