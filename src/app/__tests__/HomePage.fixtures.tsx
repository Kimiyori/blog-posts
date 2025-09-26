import type { RenderResult } from "vitest-browser-react";
import { render } from "vitest-browser-react";
import { delay, http, HttpResponse } from "msw";
import { vi } from "vitest";
import HomePage from "@/app/page";
import { ReactQueryProvider } from "@/components/ReactQueryProvider";
import { ErrorBoundary } from "@/components/shared";
import { BaseIt } from "@/tests/baseTest";
import type { Post } from "@/types/post";

export const POSTS_API_URL = "https://jsonplaceholder.typicode.com/posts";

export enum _PostsStateVariant {
  Success = "success",
  Empty = "empty",
  Error = "error",
}

type BaseState = {
  delayMs?: number;
};

type SuccessState = BaseState & {
  variant: _PostsStateVariant.Success;
  count?: number;
  posts?: Post[];
};

type EmptyState = BaseState & {
  variant: _PostsStateVariant.Empty;
};

type ErrorState = BaseState & {
  variant: _PostsStateVariant.Error;
  status?: number;
  message?: string;
};

export type PostsState = SuccessState | EmptyState | ErrorState;

interface HomePageFixture {
  postsState: PostsState;
  resolvedPosts: Post[];
  screen: RenderResult;
}

export const HomePageIt = BaseIt.extend<HomePageFixture>({
  postsState: [
    async ({}, use) => {
      await use({ variant: _PostsStateVariant.Success, count: 3 });
    },
    { auto: true },
  ],
  resolvedPosts: async ({ postsState }, use) => {
    if (postsState.variant === _PostsStateVariant.Success) {
      const count = postsState.count ?? 3;
      const posts =
        postsState.posts ??
        Array.from({ length: count }, (_, index) => ({
          id: index + 1,
          title: `Пост #${index + 1}`,
          body: `Контент поста #${index + 1}`,
          userId: index + 100,
        }));

      await use(posts);
    } else {
      await use([]);
    }
  },
  screen: async ({ postsState, resolvedPosts, mswServer }, use) => {
    mswServer.use(
      http.get(POSTS_API_URL, async () => {
        if (typeof postsState.delayMs === "number") {
          await delay(postsState.delayMs);
        }

        if (postsState.variant === _PostsStateVariant.Success) {
          return HttpResponse.json(resolvedPosts);
        }

        if (postsState.variant === _PostsStateVariant.Empty) {
          return HttpResponse.json([]);
        }

        return HttpResponse.json(
          { message: postsState.message ?? "Internal server error" },
          { status: postsState.status ?? 500 }
        );
      })
    );

    const rendered = render(
      <ReactQueryProvider>
        <ErrorBoundary>
          <HomePage />
        </ErrorBoundary>
      </ReactQueryProvider>
    );

    await use(rendered);
  },
});
