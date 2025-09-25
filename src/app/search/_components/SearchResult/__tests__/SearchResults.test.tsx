import { describe, expect } from "vitest";
import { SearchResultsIt } from "./SearchResults.fixtures";

describe("SearchResults", () => {
  SearchResultsIt(
    "renders nothing when search query is empty",
    async ({ renderSearchResults }) => {
      expect(renderSearchResults.container.firstChild).toBeNull();
    }
  );

  SearchResultsIt(
    "renders nothing when search query is only whitespace",
    async ({ renderSearchResults }) => {
      expect(renderSearchResults.container.firstChild).toBeNull();
    }
  );
});

describe("SearchResults with search query but no results", () => {
  SearchResultsIt.scoped({ searchQuery: "javascript", resultsCount: 0 });

  SearchResultsIt("displays no results message", async ({ message, icon }) => {
    await expect.element(message).toBeVisible();
    await expect
      .element(message)
      .toHaveTextContent('Не найдено статей по запросу "javascript"');
  });

  SearchResultsIt("shows search icon for no results", async ({ icon }) => {
    await expect.element(icon).toBeVisible();
    await expect.element(icon).toHaveTextContent("🔍");
  });

  SearchResultsIt("renders result container", async ({ container }) => {
    await expect.element(container).toBeVisible();
  });
});

describe("SearchResults with single result", () => {
  SearchResultsIt.scoped({ searchQuery: "react", resultsCount: 1 });

  SearchResultsIt("displays single result message", async ({ message }) => {
    await expect.element(message).toBeVisible();
    await expect
      .element(message)
      .toHaveTextContent('Найдено 1 статья по запросу "react"');
  });

  SearchResultsIt("shows success icon for results", async ({ icon }) => {
    await expect.element(icon).toBeVisible();
    await expect.element(icon).toHaveTextContent("✅");
  });
});

describe("SearchResults with multiple results", () => {
  SearchResultsIt.scoped({ searchQuery: "programming", resultsCount: 5 });

  SearchResultsIt(
    "displays multiple results message with plural",
    async ({ message }) => {
      await expect.element(message).toBeVisible();
      await expect
        .element(message)
        .toHaveTextContent('Найдено 5 статей по запросу "programming"');
    }
  );

  SearchResultsIt(
    "shows success icon for multiple results",
    async ({ icon }) => {
      await expect.element(icon).toBeVisible();
      await expect.element(icon).toHaveTextContent("✅");
    }
  );
});

describe("SearchResults with different search terms", () => {
  SearchResultsIt.scoped({ searchQuery: "TypeScript", resultsCount: 3 });

  SearchResultsIt("displays search term correctly", async ({ message }) => {
    await expect.element(message).toBeVisible();
    await expect
      .element(message)
      .toHaveTextContent('Найдено 3 статьи по запросу "TypeScript"');
  });

  SearchResultsIt.scoped({
    searchQuery: "a very long search query with multiple words",
    resultsCount: 0,
  });

  SearchResultsIt("handles long search queries", async ({ message }) => {
    await expect.element(message).toBeVisible();
    await expect
      .element(message)
      .toHaveTextContent(
        'Не найдено статей по запросу "a very long search query with multiple words"'
      );
  });
});

describe("SearchResults edge cases", () => {
  SearchResultsIt.scoped({ searchQuery: " ", resultsCount: 5 });

  SearchResultsIt(
    "handles whitespace-only query",
    async ({ renderSearchResults }) => {
      expect(renderSearchResults.container.firstChild).toBeNull();
    }
  );

  SearchResultsIt.scoped({ searchQuery: "test", resultsCount: 100 });

  SearchResultsIt("handles large result counts", async ({ message }) => {
    await expect.element(message).toBeVisible();
    await expect
      .element(message)
      .toHaveTextContent('Найдено 100 статей по запросу "test"');
  });

  SearchResultsIt.scoped({ searchQuery: "test", resultsCount: 1 });

  SearchResultsIt(
    "uses singular form for exactly one result",
    async ({ message }) => {
      await expect.element(message).toBeVisible();
      await expect
        .element(message)
        .toHaveTextContent('Найдено 1 статья по запросу "test"');
      await expect.element(message).not.toHaveTextContent("статей");
    }
  );
});
