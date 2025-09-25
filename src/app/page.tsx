"use client";

import { LoadingSpinner } from "@/components/shared";
import { CustomError } from "@/components/shared";
import { PageHeader, PostsGrid, usePosts } from "./_components";

function HomePageContent() {
  const { data: posts, isLoading, error } = usePosts();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    throw new CustomError(
      "Не удалось загрузить посты. Проверьте подключение к интернету и попробуйте снова."
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <PageHeader title="Посты" />
      <PostsGrid posts={posts || []} />
    </div>
  );
}

export default function HomePage() {
  return <HomePageContent />;
}
