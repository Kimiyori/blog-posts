import Link from "next/link";
import { Post } from "@/types/post";

interface SearchPostCardProps {
  post: Post;
}

export function SearchPostCard({ post }: SearchPostCardProps) {
  return (
    <Link href={`/posts/${post.id}`} className="block">
      <article className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20 cursor-pointer overflow-hidden transform hover:-translate-y-2 hover:scale-105 h-full">
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border border-purple-200">
              Статья #{post.id}
            </span>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span className="text-purple-500 text-sm">→</span>
            </div>
          </div>

          <h2 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors duration-200">
            {post.title}
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4 flex-grow text-sm line-clamp-4">
            {post.body}
          </p>

          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <span className="text-xs text-gray-500">Автор #{post.userId}</span>
            <span className="text-sm font-medium text-purple-600 group-hover:text-purple-800 transition-colors">
              Читать далее
            </span>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </article>
    </Link>
  );
}
