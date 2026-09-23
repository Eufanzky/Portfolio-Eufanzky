import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import Works from "./Works";
import { projects } from "../constants";

// Query by the visible label, not by role: Testing Library doesn't treat an
// <a href=""> as a link, so a button with an empty link would slip through.
const buttonHrefs = (label) =>
  screen
    .queryAllByText(label, { selector: "a > p" })
    .map((text) => text.closest("a").getAttribute("href"));

describe("Works", () => {
  it("shows a card with the name of every project", () => {
    render(<Works />);

    for (const project of projects) {
      expect(
        screen.getByRole("heading", { level: 3, name: project.name })
      ).toBeInTheDocument();
    }
  });

  it("shows a Github link only for projects that have one", () => {
    render(<Works />);

    const hrefs = buttonHrefs("Github");
    const expected = projects
      .map((project) => project.source_code_link)
      .filter((link) => link !== "");

    expect(hrefs).toEqual(expected);
  });

  it("shows a Demo link only for projects that have one", () => {
    render(<Works />);

    const hrefs = buttonHrefs("Demo");
    const expected = projects
      .map((project) => project.demo_link)
      .filter((link) => link !== "");

    expect(hrefs).toEqual(expected);
  });

  it("opens project links in a new tab", () => {
    render(<Works />);

    const links = screen
      .getAllByText(/^(Github|Demo)$/, { selector: "a > p" })
      .map((text) => text.closest("a"));
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });
});
