import { vi } from "vitest";

// Replace window.matchMedia with one whose result a test controls.
// `setMatches` changes it and notifies the "change" listeners, like resizing
// the window across the breakpoint. `src/test/setup.js` restores the default
// stub (always false) after each test.
export const mockMatchMedia = (initialMatches) => {
  let matches = initialMatches;
  const listeners = new Set();

  window.matchMedia = vi.fn((query) => ({
    get matches() {
      return matches;
    },
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: (type, listener) => listeners.add(listener),
    removeEventListener: (type, listener) => listeners.delete(listener),
    dispatchEvent: vi.fn(),
  }));

  return {
    setMatches(next) {
      matches = next;
      listeners.forEach((listener) => listener({ matches }));
    },
  };
};
