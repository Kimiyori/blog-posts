"use client";

import { useState, useMemo } from "react";
import { LoadingSpinner, CustomError } from "@/components/shared";
import {
  PageHeader,
  SearchInput,
  SearchResults,
  SearchEmptyState,
  SearchPostCard,
  usePosts,
} from "./_components";

function SearchPageContent() {
  const [searchQuery, setSearchQuery] = useState("");
  const { data: posts, isLoading, error } = usePosts();

  const filteredPosts = useMemo(() => {
    if (!posts || !searchQuery.trim()) {
      return [];
    }

    return posts.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [posts, searchQuery]);

  if (isLoading) {
    return <LoadingSpinner message="Поиск статей..." />;
  }

  if (error) {
    throw new CustomError(
      "Не удалось загрузить посты для поиска. Обновите страницу или попробуйте позже."
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader title="Поиск статей" />

      <SearchInput
        searchQuery={searchQuery}
        onSearchQueryChange={setSearchQuery}
      />

      <SearchResults
        searchQuery={searchQuery}
        resultsCount={filteredPosts.length}
      />

      {searchQuery.trim() && filteredPosts.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {filteredPosts.map((post) => (
            <SearchPostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {!searchQuery.trim() && <SearchEmptyState />}
    </div>
  );
}

export default function SearchPage() {
  return <SearchPageContent />;
}
