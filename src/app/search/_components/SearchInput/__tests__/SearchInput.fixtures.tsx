import { faker } from "@faker-js/faker";
import type { Locator } from "@vitest/browser/context";
import { type RenderResult, render } from "vitest-browser-react";
import { Mock, vi } from "vitest";
import { SearchInput } from "../SearchInput";
import { BaseIt } from "@/tests/baseTest";
import { useState } from "react";

interface SearchInputFixture {
  defaultSearchQuery: string;
  onSearchQueryChange: ReturnType<Mock>;
  onSubmit: ReturnType<Mock>;
  renderSearchInput: RenderResult;
  input: Locator;
  form: Element;
}

function TestWrapper({
  defaultSearchQuery,
  onSearchQueryChange,
  onSubmit,
}: {
  defaultSearchQuery?: string;
  onSearchQueryChange: Mock;
  onSubmit: Mock;
}) {
  const [searchQuery, setSearchQuery] = useState(defaultSearchQuery || "");

  const handleSearchQueryChange = (value: string) => {
    setSearchQuery(value);
    onSearchQueryChange(value);
  };

  return (
    <SearchInput
      searchQuery={searchQuery}
      onSearchQueryChange={handleSearchQueryChange}
      onSubmit={onSubmit}
    />
  );
}

export const SearchInputIt = BaseIt.extend<SearchInputFixture>({
  defaultSearchQuery: [
    async ({}, use) => {
      const query = "";
      await use(query);
    },
    { auto: true },
  ],
  onSearchQueryChange: [
    async ({}, use) => {
      const mock = vi.fn();
      await use(mock);
    },
    { auto: true },
  ],
  onSubmit: [
    async ({}, use) => {
      const mock = vi.fn();
      await use(mock);
    },
    { auto: true },
  ],
  renderSearchInput: async (
    { onSearchQueryChange, onSubmit, defaultSearchQuery },
    use
  ) => {
    const screen = render(
      <TestWrapper
        defaultSearchQuery={defaultSearchQuery}
        onSearchQueryChange={onSearchQueryChange}
        onSubmit={onSubmit}
      />
    );
    await use(screen);
  },
  input: async ({ renderSearchInput }, use) => {
    const input = renderSearchInput.getByPlaceholder(
      "Поиск по названию статьи"
    );
    await use(input);
  },
  form: async ({ renderSearchInput }, use) => {
    const form = renderSearchInput.container.querySelector("form") as Element;
    await use(form);
  },
});
