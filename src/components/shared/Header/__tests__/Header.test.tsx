import { describe, expect } from "vitest";
import { HeaderIt } from "./Header.fixtures";

describe("Header", () => {
  HeaderIt(
    "renders header with navigation",
    async ({ header, brandLink, homeLink, searchLink }) => {
      await expect.element(header).toBeVisible();
      await expect.element(brandLink).toBeVisible();
      await expect.element(homeLink).toBeVisible();
      await expect.element(searchLink).toBeVisible();
    }
  );

  HeaderIt("brand link navigates to home", async ({ brandLink }) => {
    await expect.element(brandLink).toHaveTextContent("DevBlog");
    await expect.element(brandLink).toHaveAttribute("href", "/");
  });

  HeaderIt(
    "navigation links have correct destinations",
    async ({ homeLink, searchLink }) => {
      await expect.element(homeLink).toHaveTextContent("Главная");
      await expect.element(homeLink).toHaveAttribute("href", "/");

      await expect.element(searchLink).toHaveTextContent("Поиск");
      await expect.element(searchLink).toHaveAttribute("href", "/search");
    }
  );

  HeaderIt(
    "has proper accessibility structure",
    async ({ header, navigation }) => {
      await expect.element(header).toHaveRole("banner");
      await expect.element(navigation).toHaveRole("navigation");
    }
  );
});

describe("Header responds to route changes", () => {
  HeaderIt.scoped({ pathname: "/" });
  HeaderIt(
    "renders correctly on home page",
    async ({ homeLink, searchLink }) => {
      await expect.element(homeLink).toBeVisible();
      await expect.element(searchLink).toBeVisible();
    }
  );

  HeaderIt.scoped({ pathname: "/search" });
  HeaderIt(
    "renders correctly on search page",
    async ({ homeLink, searchLink }) => {
      await expect.element(homeLink).toBeVisible();
      await expect.element(searchLink).toBeVisible();
    }
  );

  HeaderIt.scoped({ pathname: "/posts/123" });
  HeaderIt(
    "renders correctly on other pages",
    async ({ homeLink, searchLink }) => {
      await expect.element(homeLink).toBeVisible();
      await expect.element(searchLink).toBeVisible();
    }
  );
});
