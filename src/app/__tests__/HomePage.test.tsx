import { describe, expect } from "vitest";
import { HomePageIt, _PostsStateVariant } from "./HomePage.fixtures";

describe("HomePage", () => {
  HomePageIt(
    "renders posts returned by API",
    async ({ screen, resolvedPosts }) => {
      for (const post of resolvedPosts) {
        const title = screen.getByRole("heading", { name: post.title });
        await expect.element(title).toBeVisible();

        const body = screen.getByText(post.body);
        await expect.element(body).toBeVisible();
      }
    }
  );

  describe("when posts resolve after a delay", () => {
    HomePageIt.scoped({
      postsState: {
        variant: _PostsStateVariant.Success,
        count: 2,
        delayMs: 150,
      },
    });

    HomePageIt(
      "shows loading spinner before posts and hides it after data resolves",
      async ({ screen, resolvedPosts }) => {
        const loading = screen.getByText("Загрузка...");
        await expect.element(loading).toBeVisible();

        await expect
          .poll(() => screen.container.querySelectorAll("article").length)
          .toBe(resolvedPosts.length);

        await expect
          .poll(() => screen.container.textContent?.includes("Загрузка..."))
          .toBe(false);
      }
    );
  });

  describe("when API returns no posts", () => {
    HomePageIt.scoped({
      postsState: { variant: _PostsStateVariant.Empty },
    });

    HomePageIt(
      "renders empty state when API returns no posts",
      async ({ screen }) => {
        const emptyHeading = screen.getByText("Статьи не найдены");
        await expect.element(emptyHeading).toBeVisible();

        const helperText = screen.getByText(
          "На данный момент нет статей для отображения."
        );
        await expect.element(helperText).toBeVisible();
      }
    );
  });

  describe("when API request fails", () => {
    HomePageIt.scoped({
      postsState: {
        variant: _PostsStateVariant.Error,
        status: 500,
        message: "Internal server error",
      },
    });

    HomePageIt(
      "renders error fallback when API request fails",
      async ({ screen }) => {
        const errorHeading = screen.getByRole("heading", {
          name: "Что-то пошло не так",
        });
        await expect.element(errorHeading).toBeVisible();

        const errorMessage = screen.getByText(
          "Не удалось загрузить посты. Проверьте подключение к интернету и попробуйте снова."
        );
        await expect.element(errorMessage).toBeVisible();
      }
    );
  });
});
