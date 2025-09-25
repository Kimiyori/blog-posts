import Link from "next/link";

interface PostNotFoundProps {}

export function PostNotFound({}: PostNotFoundProps) {
  return (
    <div className="max-w-4xl mx-auto text-center">
      <div className="bg-red-50 border border-red-200 rounded-2xl p-12">
        <div className="text-red-500 text-8xl mb-6">📭</div>
        <h1 className="text-3xl font-bold text-red-700 mb-4">
          Статья не найдена
        </h1>
        <p className="text-red-600 mb-8">Запрашиваемая статья не сущсттвует</p>
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Вернуться на главную
        </Link>
      </div>
    </div>
  );
}
