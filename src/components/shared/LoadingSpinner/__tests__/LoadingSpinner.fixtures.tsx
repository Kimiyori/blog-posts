import { faker } from "@faker-js/faker";
import type { Locator } from "@vitest/browser/context";
import { type RenderResult, render } from "vitest-browser-react";
import { BaseIt } from "@/tests/baseTest";
import { LoadingSpinner } from "../LoadingSpinner";

interface LoadingSpinnerFixture {
  message: string;
  renderLoadingSpinner: RenderResult;
  container: Locator;
  spinner: Locator;
  messageElement: Locator;
}

export const LoadingSpinnerIt = BaseIt.extend<LoadingSpinnerFixture>({
  message: [
    async ({}, use) => {
      const message = faker.lorem.sentence();
      await use(message);
    },
    { auto: true },
  ],
  renderLoadingSpinner: async ({ message }, use) => {
    const screen = render(<LoadingSpinner message={message} />);
    await use(screen);
  },
  container: async ({ renderLoadingSpinner }, use) => {
    const container = renderLoadingSpinner.container.querySelector("div");
    await use(container as any);
  },
  spinner: async ({ renderLoadingSpinner }, use) => {
    const spinner =
      renderLoadingSpinner.container.querySelector(".animate-spin");
    await use(spinner as any);
  },
  messageElement: async ({ renderLoadingSpinner, message }, use) => {
    const messageEl = renderLoadingSpinner.getByText(message);
    await use(messageEl);
  },
});
