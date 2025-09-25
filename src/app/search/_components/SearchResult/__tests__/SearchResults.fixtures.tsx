import type { Locator } from "@vitest/browser/context";
import { type RenderResult, render } from "vitest-browser-react";
import { BaseIt } from "@/tests/baseTest";
import { SearchResults } from "@/app/search/_components/SearchResult/SearchResults";

interface SearchResultsFixture {
  searchQuery: string;
  resultsCount: number;
  renderSearchResults: RenderResult;
  container: Locator | null;
  message: Locator | null;
  icon: Locator | null;
}

export const SearchResultsIt = BaseIt.extend<SearchResultsFixture>({
  searchQuery: [
    async ({}, use) => {
      const query = "";
      await use(query);
    },
    { auto: true },
  ],
  resultsCount: [
    async ({}, use) => {
      const count = 0;
      await use(count);
    },
    { auto: true },
  ],
  renderSearchResults: async ({ searchQuery, resultsCount }, use) => {
    const screen = render(
      <SearchResults searchQuery={searchQuery} resultsCount={resultsCount} />
    );
    await use(screen);
  },
  container: async ({ renderSearchResults, searchQuery }, use) => {
    if (!searchQuery.trim()) {
      await use(null);
    } else {
      const container = renderSearchResults.container.querySelector("div");
      await use(container as any);
    }
  },
  message: async ({ renderSearchResults, searchQuery }, use) => {
    if (!searchQuery.trim()) {
      await use(null);
    } else {
      const paragraph = renderSearchResults.container.querySelector("p");
      await use(paragraph as any);
    }
  },
  icon: async ({ renderSearchResults, searchQuery }, use) => {
    if (!searchQuery.trim()) {
      await use(null);
    } else {
      const span = renderSearchResults.container.querySelector("span");
      await use(span as any);
    }
  },
});
