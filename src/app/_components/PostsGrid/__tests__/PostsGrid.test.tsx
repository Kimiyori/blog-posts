import { describe, expect } from "vitest";
import { PostsGridIt, createMockPosts } from "./PostsGrid.fixtures";

describe("PostsGrid", () => {
  PostsGridIt(
    "renders empty state when no posts provided",
    async ({ emptyState, renderPostsGrid }) => {
      await expect.element(emptyState).toBeVisible();
      await expect.element(emptyState).toHaveTextContent("Статьи не найдены");

      const emptyMessage = renderPostsGrid.getByText(
        "На данный момент нет статей для отображения."
      );
      await expect.element(emptyMessage).toBeVisible();
    }
  );

  PostsGridIt(
    "renders empty state when posts array is empty",
    async ({ emptyState }) => {
      await expect.element(emptyState).toBeVisible();
      await expect.element(emptyState).toHaveTextContent("Статьи не найдены");
    }
  );

});

describe("PostsGrid with posts", () => {
  PostsGridIt.scoped({ posts: createMockPosts(3) });

  PostsGridIt(
    "renders post cards when posts are provided",
    async ({ postCards, posts }) => {
      expect(postCards).toHaveLength(posts.length);
    }
  );

  PostsGridIt(
    "does not show empty state when posts exist",
    async ({ renderPostsGrid }) => {
      const emptyStateElements =
        renderPostsGrid.container.querySelectorAll("text-center py-16");
      expect(emptyStateElements).toHaveLength(0);
    }
  );

  PostsGridIt(
    "renders each post in a PostCard component",
    async ({ renderPostsGrid, posts }) => {
      const articles = renderPostsGrid.container.querySelectorAll("article");
      expect(articles).toHaveLength(posts.length);
    }
  );
});

describe("PostsGrid with single post", () => {
  PostsGridIt.scoped({ posts: createMockPosts(1) });

  PostsGridIt("renders single post correctly", async ({ postCards }) => {
    expect(postCards).toHaveLength(1);
  });
});

describe("PostsGrid with many posts", () => {
  PostsGridIt.scoped({ posts: createMockPosts(12) });

  PostsGridIt(
    "renders all posts in grid layout",
    async ({ postCards, posts }) => {
      expect(postCards).toHaveLength(posts.length);
      expect(postCards.length).toBe(12);
    }
  );
});

describe("PostsGrid edge cases", () => {
  PostsGridIt.scoped({ posts: null as any });

  PostsGridIt("handles null posts gracefully", async ({ emptyState }) => {
    await expect.element(emptyState).toBeVisible();
    await expect.element(emptyState).toHaveTextContent("Статьи не найдены");
  });
});
