import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";

afterEach(() => {
  cleanup();
  window.matchMedia = defaultMatchMedia;
});

// jsdom has no IntersectionObserver. Framer Motion's whileInView and the
// experience timeline need it. Report every element as visible right away.
class IntersectionObserverStub {
  constructor(callback) {
    this.callback = callback;
  }
  observe(target) {
    this.callback([{ isIntersecting: true, intersectionRatio: 1, target }], this);
  }
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
}
vi.stubGlobal("IntersectionObserver", IntersectionObserverStub);

// jsdom has no matchMedia either. It never matches, so components render
// their desktop layout. Tests can override it with `mockMatchMedia`
// (src/test/matchMedia.js).
const defaultMatchMedia = vi.fn((query) => ({
  matches: false,
  media: query,
  onchange: null,
  addListener: vi.fn(),
  removeListener: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
  dispatchEvent: vi.fn(),
}));
vi.stubGlobal("matchMedia", defaultMatchMedia);
