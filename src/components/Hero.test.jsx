import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import Hero from "./Hero";
import { mockMatchMedia } from "../test/matchMedia";

// jsdom has no WebGL. The marker shows whether Hero asked for the canvas.
vi.mock("./canvas/Computers", () => ({
  default: () => <div data-testid="computers-canvas" />,
}));

describe("Hero", () => {
  it("shows the heading", () => {
    render(<Hero />);
    expect(
      screen.getByRole("heading", { level: 1, name: /Hi, I'm Eugenio/ })
    ).toBeInTheDocument();
  });

  it("shows the 3D computer at desktop width", async () => {
    mockMatchMedia(false);
    render(<Hero />);
    expect(await screen.findByTestId("computers-canvas")).toBeInTheDocument();
  });

  it("never renders the 3D computer at phone width", async () => {
    mockMatchMedia(true);
    render(<Hero />);
    // Let the lazy import settle, in case it was requested.
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(screen.queryByTestId("computers-canvas")).not.toBeInTheDocument();
  });
});
