import { faker } from "@faker-js/faker";
import type { Locator } from "@vitest/browser/context";
import { type RenderResult, render } from "vitest-browser-react";
import { BaseIt } from "@/tests/baseTest";
import type { Post } from "@/types/post";
import { PostDetail } from "@/app/posts/[id]/_components/PostDetail/PostDetail";

interface PostDetailFixture {
  post: Post;
  renderPostDetail: RenderResult;
  article: Locator;
  title: Locator;
  body: Locator;
  postIdBadge: Locator;
  userIdBadge: Locator;
  backLink: Locator;
}

export const PostDetailIt = BaseIt.extend<PostDetailFixture>({
  post: [
    async ({}, use) => {
      const posts = [
        {
          id: 1,
          title: "Микрофронтенды: архитектура будущего",
          body: "Микрофронтенды представляют собой архитектурный подход, который позволяет разделить большое фронтенд-приложение на более мелкие, управляемые части. Каждая часть может разрабатываться независимо разными командами, используя различные технологии и подходы.\n\nОсновные преимущества микрофронтендов включают независимое развертывание, технологическое разнообразие, изоляцию команд и масштабируемость. Однако этот подход также приносит свои вызовы, такие как координация между командами, производительность и сложность интеграции.\n\nВ этой статье мы рассмотрим различные стратегии реализации микрофронтендов, включая Module Federation, Single-SPA и другие подходы.",
          userId: 5,
        },
        {
          id: 2,
          title: "GraphQL против REST API",
          body: "Сравнение двух популярных подходов к построению API. GraphQL предлагает более гибкий способ запроса данных, позволяя клиентам получать точно те данные, которые им нужны. REST API, с другой стороны, следует более традиционному подходу с фиксированными эндпоинтами.\n\nОсновные преимущества GraphQL: единая точка входа, строгая типизация, интроспекция схемы и возможность получать связанные данные в одном запросе. REST API предлагает простоту, кэширование HTTP, широкую поддержку инструментов и понятную структуру.\n\nВыбор между GraphQL и REST зависит от специфики проекта, команды и требований к производительности.",
          userId: 3,
        },
        {
          id: 3,
          title: "Современные инструменты разработчика",
          body: "Экосистема инструментов для веб-разработки постоянно эволюционирует. В 2024 году разработчики имеют доступ к мощным инструментам, которые значительно упрощают процесс создания веб-приложений.\n\nVite революционизировал процесс сборки, предлагая молниеносную скорость в режиме разработки. ESBuild и SWC предоставляют невероятно быструю транспиляцию. Playwright и Cypress сделали end-to-end тестирование более доступным.\n\nИнтеграция TypeScript стала стандартом, а инструменты анализа кода как ESLint и Prettier помогают поддерживать качество кодовой базы.",
          userId: 2,
        },
      ];

      const randomPost = posts[Math.floor(Math.random() * posts.length)];
      await use(randomPost);
    },
    { auto: true },
  ],
  renderPostDetail: async ({ post }, use) => {
    const screen = render(<PostDetail post={post} />);
    await use(screen);
  },
  article: async ({ renderPostDetail }, use) => {
    const article = renderPostDetail.getByRole("article");
    await use(article);
  },
  title: async ({ renderPostDetail }, use) => {
    const title = renderPostDetail.getByRole("heading", { level: 1 });
    await use(title);
  },
  body: async ({ renderPostDetail, post }, use) => {
    const body = renderPostDetail.getByText(post.body);
    await use(body);
  },
  postIdBadge: async ({ renderPostDetail, post }, use) => {
    const badge = renderPostDetail.getByText(`Статья #${post.id}`);
    await use(badge);
  },
  userIdBadge: async ({ renderPostDetail, post }, use) => {
    const badge = renderPostDetail.getByText(`Автор #${post.userId}`);
    await use(badge);
  },
  backLink: async ({ renderPostDetail }, use) => {
    const link = renderPostDetail.getByRole("link", {
      name: "Назад ко всем статьям",
    });
    await use(link);
  },
});

export const createMockPost = (overrides: Partial<Post> = {}): Post => ({
  id: 1,
  title: "Архитектура современных веб-приложений",
  body: "Современные веб-приложения требуют продуманной архитектуры для обеспечения масштабируемости, поддерживаемости и производительности. Рассмотрим ключевые принципы и паттерны, которые помогут создать надежную основу для вашего приложения.\n\nМодульная архитектура позволяет разделить приложение на логически связанные компоненты, что упрощает разработку и тестирование.",
  userId: 1,
  ...overrides,
});
