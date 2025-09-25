import Link from "next/link";
import { Post } from "@/types/post";

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  return (
    <Link href={`/posts/${post.id}`} className="block">
      <article className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-white/20 cursor-pointer overflow-hidden transform hover:-translate-y-2 hover:scale-105 h-full">
        <div className="p-6 h-full flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border border-blue-200">
              Статья #{post.id}
            </span>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <span className="text-blue-500 text-sm">→</span>
            </div>
          </div>

          <h2 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
            {post.title}
          </h2>

          <p className="text-gray-600 leading-relaxed mb-4 flex-grow text-sm line-clamp-2">
            {post.body}
          </p>

          <div className="flex justify-between items-center pt-4 border-t border-gray-100">
            <span className="text-xs text-gray-500">Автор #{post.userId}</span>
            <span className="text-sm font-medium text-blue-600 group-hover:text-blue-800 transition-colors">
              Читать далее
            </span>
          </div>
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </article>
    </Link>
  );
}
