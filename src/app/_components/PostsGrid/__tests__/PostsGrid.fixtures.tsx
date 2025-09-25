import { faker } from "@faker-js/faker";
import type { Locator } from "@vitest/browser/context";
import { type RenderResult, render } from "vitest-browser-react";
import { PostsGrid } from "../PostsGrid";
import { BaseIt } from "@/tests/baseTest";
import type { Post } from "@/types/post";

interface PostsGridFixture {
  posts: Post[];
  renderPostsGrid: RenderResult;
  container: HTMLElement|null;
  emptyState: Locator | null;
  postCards: HTMLElement[];
}

export const PostsGridIt = BaseIt.extend<PostsGridFixture>({
  posts: [
    async ({}, use) => {
      const posts: Post[] = [];
      await use(posts);
    },
    { auto: true },
  ],
  renderPostsGrid: async ({ posts }, use) => {
    const screen = render(<PostsGrid posts={posts} />);
    await use(screen);
  },
  container: async ({ renderPostsGrid }, use) => {
    const container = renderPostsGrid.container.querySelector("div");
    await use(container);
  },
  emptyState: async ({ renderPostsGrid, posts }, use) => {
    if (!posts || posts.length === 0) {
      const emptyState = renderPostsGrid.getByText("Статьи не найдены");
      await use(emptyState);
    } else {
      await use(null);
    }
  },
  postCards: async ({ renderPostsGrid, posts }, use) => {
    if (posts && posts.length > 0) {
      const cards = renderPostsGrid.container.querySelectorAll("article");
      await use(Array.from(cards));
    } else {
      await use([]);
    }
  },
});

export const createMockPosts = (count: number): Post[] => {
  const posts = [
    {
      id: 1,
      title: "Введение в современный JavaScript",
      body: "JavaScript постоянно развивается, и современные возможности языка позволяют писать более чистый и эффективный код. Рассмотрим ES2023 функции и их практическое применение.",
      userId: 1,
    },
    {
      id: 2,
      title: "Работа с API в React приложениях",
      body: "Изучаем лучшие практики для работы с внешними API в React. Рассматриваем использование fetch, axios, и современные хуки для управления состоянием.",
      userId: 2,
    },
    {
      id: 3,
      title: "Тестирование компонентов с Vitest",
      body: "Vitest - быстрый и простой инструмент для тестирования JavaScript приложений. Узнаем, как настроить тестовую среду и писать эффективные тесты.",
      userId: 3,
    },
    {
      id: 4,
      title: "CSS Grid vs Flexbox: когда использовать",
      body: "Сравниваем две мощные системы макетирования в CSS. Разбираем практические примеры и даем рекомендации по выбору подходящего инструмента.",
      userId: 1,
    },
    {
      id: 5,
      title: "Оптимизация производительности Next.js",
      body: "Next.js предоставляет множество инструментов для оптимизации. Изучаем техники повышения скорости загрузки и улучшения пользовательского опыта.",
      userId: 4,
    },
  ];

  if (count <= posts.length) {
    return posts.slice(0, count);
  }

  // If need more posts, duplicate with different IDs
  const result = [...posts];
  while (result.length < count) {
    const basePost = posts[result.length % posts.length];
    result.push({
      ...basePost,
      id: result.length + 1,
    });
  }

  return result.slice(0, count);
};
