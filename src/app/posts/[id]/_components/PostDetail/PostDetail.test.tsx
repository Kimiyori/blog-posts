import { describe, expect } from "vitest";
import { PostDetailIt, createMockPost } from "./PostDetail.fixtures";

describe("PostDetail", () => {
  PostDetailIt(
    "renders post content correctly",
    async ({ article, title, body, post }) => {
      await expect.element(article).toBeVisible();
      await expect.element(title).toBeVisible();
      await expect.element(title).toHaveTextContent(post.title);
      await expect.element(body).toBeVisible();
    }
  );

  PostDetailIt(
    "displays post metadata badges",
    async ({ postIdBadge, userIdBadge, post }) => {
      await expect.element(postIdBadge).toBeVisible();
      await expect.element(postIdBadge).toHaveTextContent(`Статья #${post.id}`);

      await expect.element(userIdBadge).toBeVisible();
      await expect
        .element(userIdBadge)
        .toHaveTextContent(`Автор #${post.userId}`);
    }
  );

  PostDetailIt("has navigation link back to home", async ({ backLink }) => {
    await expect.element(backLink).toBeVisible();
    await expect.element(backLink).toHaveTextContent("Назад ко всем статьям");
    await expect.element(backLink).toHaveAttribute("href", "/");
  });

  PostDetailIt(
    "uses proper semantic HTML structure",
    async ({ article, title }) => {
      await expect.element(article).toHaveRole("article");
      await expect.element(title).toHaveRole("heading");
    }
  );

  PostDetailIt("displays thank you message", async ({ renderPostDetail }) => {
    const thankYouMessage = renderPostDetail.getByText("Спасибо за чтение! 📚");
    await expect.element(thankYouMessage).toBeVisible();
  });
});

describe("PostDetail with different post content", () => {
  PostDetailIt.scoped({
    post: createMockPost({
      id: 42,
      title: "Тестовая статья",
      body: "Это содержимое тестовой статьи.",
      userId: 7,
    }),
  });

  PostDetailIt(
    "renders specific post data correctly",
    async ({ title, body, postIdBadge, userIdBadge }) => {
      await expect.element(title).toHaveTextContent("Тестовая статья");
      await expect
        .element(body)
        .toHaveTextContent("Это содержимое тестовой статьи.");
      await expect.element(postIdBadge).toHaveTextContent("Статья #42");
      await expect.element(userIdBadge).toHaveTextContent("Автор #7");
    }
  );
});

describe("PostDetail with long content", () => {
  PostDetailIt.scoped({
    post: createMockPost({
      title:
        "This is a very long title that should still be displayed correctly in the component",
      body: "This is a very long body content that spans multiple lines and paragraphs. It should be properly formatted and displayed without any issues. The content might contain multiple sentences and should maintain proper spacing and readability.",
    }),
  });

  PostDetailIt("handles long content gracefully", async ({ title, body }) => {
    await expect.element(title).toBeVisible();
    await expect.element(body).toBeVisible();
  });
});

describe("PostDetail with edge case IDs", () => {
  PostDetailIt.scoped({ post: createMockPost({ id: 1, userId: 1 }) });

  PostDetailIt(
    "handles minimum ID values",
    async ({ postIdBadge, userIdBadge }) => {
      await expect.element(postIdBadge).toHaveTextContent("Статья #1");
      await expect.element(userIdBadge).toHaveTextContent("Автор #1");
    }
  );
});
