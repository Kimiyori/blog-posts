import { Post } from "@/types/post";
import { PostCard } from "../PostCard/PostCard";

interface PostsGridProps {
  posts: Post[];
}

export function PostsGrid({ posts }: PostsGridProps) {
  if (!posts || posts.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="text-2xl font-bold text-gray-700 mb-3">
          Статьи не найдены
        </h3>
        <p className="text-gray-500">
          На данный момент нет статей для отображения.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
