// Scroll down step by step, so lazy sections load and whileInView animations
// run, until the bottom of the page stops moving. Scrolls instantly: the site
// sets `scroll-behavior: smooth`, which is slow with software WebGL.
export const scrollToBottom = async (page) => {
  let lastHeight = 0;
  for (let i = 0; i < 100; i++) {
    const { atBottom, height } = await page.evaluate(() => {
      window.scrollTo({
        top: window.scrollY + window.innerHeight * 0.8,
        behavior: "instant",
      });
      const height = document.documentElement.scrollHeight;
      return {
        atBottom: window.scrollY + window.innerHeight >= height - 2,
        height,
      };
    });
    await page.waitForTimeout(150);
    if (atBottom && height === lastHeight) return;
    lastHeight = height;
  }
  throw new Error("Could not reach the bottom of the page");
};
