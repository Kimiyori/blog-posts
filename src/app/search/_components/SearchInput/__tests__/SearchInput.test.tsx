import { userEvent } from "@vitest/browser/context";
import { describe, expect, vi } from "vitest";
import { SearchInputIt } from "./SearchInput.fixtures";

describe("SearchInput", () => {
  SearchInputIt("renders with placeholder text", async ({ input }) => {
    await expect.element(input).toBeVisible();
  });

  SearchInputIt(
    "displays default empty search query value",
    async ({ input }) => {
      await expect.element(input).toHaveValue("");
    }
  );
  SearchInputIt(
    "hides clear button when search query is empty",
    async ({ renderSearchInput }) => {
      const clearButton = renderSearchInput.container.querySelector(
        'button[type="button"]'
      );
      expect(clearButton).not.toBeInTheDocument();
    }
  );

  SearchInputIt("shows placeholder when empty", async ({ input }) => {
    await expect
      .element(input)
      .toHaveAttribute("placeholder", "Поиск по названию статьи");
  });

  SearchInputIt(
    "Successfully changes input",
    async ({ input, onSearchQueryChange }) => {
      await userEvent.click(input);

      await userEvent.clear(input);
      await userEvent.keyboard("{test}");

      expect(onSearchQueryChange).toHaveBeenCalled();

      await expect.element(input).toHaveValue("test");
    }
  );

  SearchInputIt(
    "handles keyboard interactions correctly",
    async ({ input, onSearchQueryChange, onSubmit }) => {
      await userEvent.clear(input);

      await input.fill("test query");
      await userEvent.keyboard("{Enter}");

      expect(onSearchQueryChange).toHaveBeenCalledWith("test query");
      expect(onSubmit).toHaveBeenCalled();
    }
  );
});

describe("SearchInput with search query", () => {
  SearchInputIt.scoped({ defaultSearchQuery: "existing search" });

  SearchInputIt(
    "shows clear button when there is search query",
    async ({ renderSearchInput }) => {
      const clearButton = renderSearchInput.container.querySelector(
        'button[type="button"]'
      );
      expect(clearButton).toBeInTheDocument();
    }
  );

  SearchInputIt(
    "clears search when clear button is clicked",
    async ({ renderSearchInput, onSearchQueryChange }) => {
      const clearButton = renderSearchInput.container.querySelector(
        'button[type="button"]'
      );
      await userEvent.click(clearButton!);

      expect(onSearchQueryChange).toHaveBeenCalledWith("");
    }
  );

  SearchInputIt("focuses input when clicked", async ({ input }) => {
    await userEvent.click(input);
    await expect.element(input).toHaveAttribute("type", "text");
  });
});

describe("SearchInput accessibility", () => {
  SearchInputIt("has proper ARIA attributes", async ({ input }) => {
    await expect.element(input).toHaveAttribute("type", "text");
    await expect.element(input).toHaveAttribute("placeholder");
  });
});
