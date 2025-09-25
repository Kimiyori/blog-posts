import Link from "next/link";
import { Post } from "@/types/post";

interface PostDetailProps {
  post: Post;
}

export function PostDetail({ post }: PostDetailProps) {
  return (
    <article className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
      <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"></div>

      <div className="p-8 md:p-12">
        <header className="mb-8 pb-8 border-b border-gray-100">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 border border-blue-200">
              Статья #{post.id}
            </span>
            <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-gray-100 to-slate-100 text-gray-600 border border-gray-200">
              Автор #{post.userId}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-black leading-tight">
            {post.title}
          </h1>
        </header>

        <div className="prose prose-lg max-w-none">
          <div className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 border border-gray-100">
            <p className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">
              {post.body}
            </p>
          </div>
        </div>

        <footer className="mt-12 pt-8 border-t border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <Link
            href="/"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Назад ко всем статьям
          </Link>
          <div className="text-sm text-gray-500">Спасибо за чтение! 📚</div>
        </footer>
      </div>
    </article>
  );
}
