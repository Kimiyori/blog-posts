import { faker } from "@faker-js/faker";
import type { Locator } from "@vitest/browser/context";
import { type RenderResult, render } from "vitest-browser-react";
import type { Post } from "@/types/post";
import { BaseIt } from "@/tests/baseTest";
import { PostCard } from "@/app/_components/PostCard/PostCard";

interface PostCardFixture {
  post: Post;
  renderPostCard: RenderResult;
  component: Locator;
  link: Locator;
  title: Locator;
  body: Locator;
  userId: Locator;
  postId: Locator;
}

export const PostCardIt = BaseIt.extend<PostCardFixture>({
  post: [
    async ({}, use) => {
      const posts = [
        {
          id: 1,
          title: "Основы React: руководство для начинающих",
          body: "React - это популярная JavaScript библиотека для создания пользовательских интерфейсов. В этой статье мы рассмотрим основные концепции и принципы работы с React.",
          userId: 1,
        },
        {
          id: 2,
          title: "TypeScript в проектах Next.js",
          body: "TypeScript добавляет статическую типизацию в JavaScript, что делает код более надежным и предсказуемым. Узнаем, как интегрировать TypeScript в Next.js проекты.",
          userId: 2,
        },
        {
          id: 3,
          title: "CSS-in-JS против Tailwind CSS",
          body: "Сравниваем различные подходы к стилизации в современной веб-разработке. Рассмотрим плюсы и минусы CSS-in-JS решений и utility-first фреймворков.",
          userId: 1,
        },
      ];

      const randomPost = posts[Math.floor(Math.random() * posts.length)];
      await use(randomPost);
    },
    { auto: true },
  ],
  renderPostCard: async ({ post }, use) => {
    const screen = render(<PostCard post={post} />);
    await use(screen);
  },
  component: async ({ renderPostCard }, use) => {
    const article = renderPostCard.getByRole("article");
    await use(article);
  },
  link: async ({ renderPostCard }, use) => {
    const link = renderPostCard.getByRole("link");
    await use(link);
  },
  title: async ({ renderPostCard }, use) => {
    const title = renderPostCard.getByRole("heading", { level: 2 });
    await use(title);
  },
  body: async ({ renderPostCard, post }, use) => {
    const body = renderPostCard.getByText(post.body, { exact: false });
    await use(body);
  },
  userId: async ({ renderPostCard, post }, use) => {
    const userId = renderPostCard.getByText(`Автор #${post.userId}`);
    await use(userId);
  },
  postId: async ({ renderPostCard, post }, use) => {
    const postId = renderPostCard.getByText(`Статья #${post.id}`);
    await use(postId);
  },
});
