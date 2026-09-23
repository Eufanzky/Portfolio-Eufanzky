import { describe, it, expect } from "vitest";

import { projects } from "./index";

describe("projects data", () => {
  it("has at least one project", () => {
    expect(projects.length).toBeGreaterThan(0);
  });

  it.each(projects.map((project, index) => [project.name || `#${index}`, project]))(
    "%s is complete",
    (_, project) => {
      expect(project.name).toEqual(expect.any(String));
      expect(project.name.trim()).not.toBe("");
      expect(project.description).toEqual(expect.any(String));
      expect(project.description.trim()).not.toBe("");

      expect(project.tags.length).toBeGreaterThan(0);
      for (const tag of project.tags) {
        expect(tag.name.trim()).not.toBe("");
        expect(tag.color.trim()).not.toBe("");
      }

      expect(project.image).toEqual(expect.any(String));
      expect(project.image).not.toBe("");
      expect(project.source_code_link).toMatch(/^https:\/\/github\.com\/.+/);
      expect(project.demo_link).toEqual(expect.any(String));
    }
  );
});
