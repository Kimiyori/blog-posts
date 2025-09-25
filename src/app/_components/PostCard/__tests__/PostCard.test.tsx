import { userEvent } from "@vitest/browser/context";
import { describe, expect } from "vitest";
import { PostCardIt } from "./PostCard.fixtures";

describe("PostCard", () => {
  PostCardIt("renders and is visible", async ({ component, link }) => {
    await expect.element(component).toBeVisible();
    await expect.element(link).toBeVisible();
  });

  PostCardIt(
    "displays post content correctly",
    async ({ title, body, userId, postId, post }) => {
      await expect.element(title).toHaveTextContent(post.title);
      await expect.element(body).toBeVisible();
      await expect.element(userId).toHaveTextContent(`Автор #${post.userId}`);
      await expect.element(postId).toHaveTextContent(`Статья #${post.id}`);
    }
  );

  PostCardIt("has correct link href", async ({ link, post }) => {
    await expect.element(link).toHaveAttribute("href", `/posts/${post.id}`);
  });

  PostCardIt("has correct article structure", async ({ component }) => {
    await expect.element(component).toBeInTheDocument();
    await expect.element(component).toHaveClass("group");
  });

  PostCardIt("contains read more text", async ({ renderPostCard }) => {
    const readMore = renderPostCard.getByText("Читать далее");
    await expect.element(readMore).toBeVisible();
  });

  PostCardIt("is clickable and navigable", async ({ link }) => {
    await expect.element(link).toHaveAttribute("href");
    await userEvent.tab();
  });

  PostCardIt("has proper accessibility attributes", async ({ link }) => {
    await expect.element(link).toHaveAttribute("href");
    await expect.element(link).toBeVisible();
  });

  PostCardIt("displays post ID badge", async ({ postId, post }) => {
    await expect.element(postId).toBeVisible();
    await expect.element(postId).toHaveTextContent(`Статья #${post.id}`);
  });

  PostCardIt("displays user ID information", async ({ userId, post }) => {
    await expect.element(userId).toBeVisible();
    await expect.element(userId).toHaveTextContent(`Автор #${post.userId}`);
  });
});

describe("PostCard with long content", () => {
  PostCardIt.scoped({
    post: {
      id: 999,
      title:
        "Это очень длинный заголовок статьи, который должен быть обрезан при отображении в карточке для тестирования поведения ограничения строк",
      body: "Это чрезвычайно длинный текст статьи, который продолжается и должен продемонстрировать поведение line-clamp-2 компонента. Современные веб-технологии развиваются стремительными темпами, и разработчики должны постоянно изучать новые инструменты и подходы. React, Next.js, TypeScript - это лишь небольшая часть экосистемы современной фронтенд-разработки.",
      userId: 42,
    },
  });

  PostCardIt(
    "handles long content gracefully",
    async ({ title, body, post }) => {
      await expect.element(title).toHaveTextContent(post.title);
      await expect.element(body).toBeVisible();
    }
  );
});
