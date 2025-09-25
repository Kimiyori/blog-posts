import { describe, expect } from "vitest";
import { LoadingSpinnerIt } from "./LoadingSpinner.fixtures";

describe("LoadingSpinner", () => {
  LoadingSpinnerIt(
    "renders with default message",
    async ({ messageElement, spinner }) => {
      await expect.element(messageElement).toBeInTheDocument();
    }
  );

  LoadingSpinnerIt("has spinning animation", async ({ spinner }) => {
    await expect.element(spinner).toBeInTheDocument();
    await expect.element(spinner).toHaveClass("animate-spin");
  });

  LoadingSpinnerIt("is accessible", async ({ messageElement }) => {
    await expect.element(messageElement).toBeVisible();
    await expect.element(messageElement).toHaveAttribute("class");
  });
});

describe("LoadingSpinner with custom message", () => {
  LoadingSpinnerIt.scoped({ message: "Loading" });

  LoadingSpinnerIt("shows default loading text", async ({ messageElement }) => {
    await expect.element(messageElement).toHaveTextContent("Loading");
  });
});
