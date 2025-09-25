import type { Locator } from "@vitest/browser/context";
import { type RenderResult, render } from "vitest-browser-react";
import { vi } from "vitest";
import { Header } from "../Header";
import { BaseIt } from "@/tests/baseTest";

const mockUsePathname = vi.fn().mockReturnValue("/");

vi.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

interface HeaderFixture {
  pathname: string;
  renderHeader: RenderResult;
  header: Locator;
  brandLink: Locator;
  homeLink: Locator;
  searchLink: Locator;
  navigation: Locator;
}

export const HeaderIt = BaseIt.extend<HeaderFixture>({
  pathname: [
    async ({}, use) => {
      const path = "/";
      await use(path);
    },
    { auto: true },
  ],
  renderHeader: async ({ pathname }, use) => {
    mockUsePathname.mockReturnValue(pathname);
    const screen = render(<Header />);
    await use(screen);
  },
  header: async ({ renderHeader }, use) => {
    const header = renderHeader.getByRole("banner");
    await use(header);
  },
  brandLink: async ({ renderHeader }, use) => {
    const brandLink = renderHeader.getByRole("link", { name: "DevBlog" });
    await use(brandLink);
  },
  homeLink: async ({ renderHeader }, use) => {
    const homeLink = renderHeader.getByRole("link", { name: "Главная" });
    await use(homeLink);
  },
  searchLink: async ({ renderHeader }, use) => {
    const searchLink = renderHeader.getByRole("link", { name: "Поиск" });
    await use(searchLink);
  },
  navigation: async ({ renderHeader }, use) => {
    const nav = renderHeader.getByRole("navigation");
    await use(nav);
  },
});
