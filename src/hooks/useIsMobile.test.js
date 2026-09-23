import { describe, it, expect } from "vitest";
import { act, renderHook } from "@testing-library/react";

import { useIsMobile, MOBILE_QUERY } from "./useIsMobile";
import { mockMatchMedia } from "../test/matchMedia";

describe("useIsMobile", () => {
  it("is true on the first render at phone width", () => {
    mockMatchMedia(true);
    const renders = [];
    renderHook(() => renders.push(useIsMobile()));

    // Never false first: that render would already request the 3D chunks.
    expect(renders[0]).toBe(true);
    expect(window.matchMedia).toHaveBeenCalledWith(MOBILE_QUERY);
  });

  it("is false at desktop width", () => {
    mockMatchMedia(false);
    const { result } = renderHook(() => useIsMobile());
    expect(result.current).toBe(false);
  });

  it("follows the window across the breakpoint", () => {
    const media = mockMatchMedia(false);
    const { result } = renderHook(() => useIsMobile());

    act(() => media.setMatches(true));
    expect(result.current).toBe(true);

    act(() => media.setMatches(false));
    expect(result.current).toBe(false);
  });
});
