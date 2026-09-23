import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import emailjs from "@emailjs/browser";

import Contact from "./Contact";
import { mockMatchMedia } from "../test/matchMedia";

// Tests must never send a real email.
vi.mock("@emailjs/browser", () => ({ default: { send: vi.fn() } }));

// jsdom has no WebGL. The marker shows whether Contact asked for the canvas.
vi.mock("./canvas/Earth", () => ({
  default: () => <div data-testid="earth-canvas" />,
}));

const fillAndSend = async (user) => {
  await user.type(screen.getByLabelText("Your Name"), "Ada Lovelace");
  await user.type(screen.getByLabelText("Your email"), "ada@example.com");
  await user.type(screen.getByLabelText("Your Message"), "Hello there");
  await user.click(screen.getByRole("button", { name: "Send" }));
};

describe("Contact", () => {
  beforeEach(() => {
    vi.stubEnv("VITE_EMAILJS_SERVICE_ID", "service-test");
    vi.stubEnv("VITE_EMAILJS_TEMPLATE_ID", "template-test");
    vi.stubEnv("VITE_EMAILJS_PUBLIC_KEY", "key-test");
    vi.stubEnv("VITE_CONTACT_EMAIL", "owner@example.com");
    vi.spyOn(window, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    vi.restoreAllMocks();
    emailjs.send.mockReset();
  });

  it("sends the typed values through EmailJS", async () => {
    emailjs.send.mockResolvedValue({ status: 200 });
    const user = userEvent.setup();
    render(<Contact />);

    await fillAndSend(user);

    expect(emailjs.send).toHaveBeenCalledTimes(1);
    expect(emailjs.send).toHaveBeenCalledWith(
      "service-test",
      "template-test",
      {
        from_name: "Ada Lovelace",
        to_name: "Eugenio",
        from_email: "ada@example.com",
        to_email: "owner@example.com",
        message: "Hello there",
      },
      "key-test"
    );
  });

  it("shows Sending... while the message is being sent", async () => {
    let finishSend;
    emailjs.send.mockReturnValue(
      new Promise((resolve) => {
        finishSend = resolve;
      })
    );
    const user = userEvent.setup();
    render(<Contact />);

    await fillAndSend(user);

    expect(screen.getByRole("button", { name: "Sending..." })).toBeInTheDocument();

    finishSend({ status: 200 });
    expect(await screen.findByRole("button", { name: "Send" })).toBeInTheDocument();
  });

  it("tells the user the message was sent and clears the form", async () => {
    emailjs.send.mockResolvedValue({ status: 200 });
    const user = userEvent.setup();
    render(<Contact />);

    await fillAndSend(user);

    await waitFor(() =>
      expect(window.alert).toHaveBeenCalledWith("Message sent successfully!")
    );
    expect(screen.getByLabelText("Your Name")).toHaveValue("");
    expect(screen.getByLabelText("Your email")).toHaveValue("");
    expect(screen.getByLabelText("Your Message")).toHaveValue("");
  });

  it("tells the user when the message could not be sent", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    emailjs.send.mockRejectedValue(new Error("network down"));
    const user = userEvent.setup();
    render(<Contact />);

    await fillAndSend(user);

    await waitFor(() =>
      expect(window.alert).toHaveBeenCalledWith(
        "Failed to send message. Please try again later."
      )
    );
    expect(screen.getByRole("button", { name: "Send" })).toBeInTheDocument();
    expect(screen.getByLabelText("Your Message")).toHaveValue("Hello there");
  });

  it("shows the 3D Earth at desktop width", async () => {
    mockMatchMedia(false);
    render(<Contact />);
    expect(await screen.findByTestId("earth-canvas")).toBeInTheDocument();
  });

  it("never renders the 3D Earth at phone width", async () => {
    mockMatchMedia(true);
    render(<Contact />);
    // Let the lazy import settle, in case it was requested.
    await new Promise((resolve) => setTimeout(resolve, 0));
    expect(screen.queryByTestId("earth-canvas")).not.toBeInTheDocument();
  });
});
