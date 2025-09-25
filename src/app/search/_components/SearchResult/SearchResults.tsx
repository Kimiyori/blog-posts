interface SearchResultsProps {
  searchQuery: string;
  resultsCount: number;
}

export function SearchResults({
  searchQuery,
  resultsCount,
}: SearchResultsProps) {
  if (!searchQuery.trim()) {
    return null;
  }

  return (
    <div className="mb-8 text-center">
      <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200">
        {resultsCount > 0 ? (
          <>
            <span className="text-green-500 mr-2">✅</span>
            <p className="text-gray-700 font-medium">
              Найдено {resultsCount}{" "}
              {resultsCount === 1
                ? "статья"
                : resultsCount > 4
                ? "статей"
                : "статьи"}{" "}
              по запросу "{searchQuery}"
            </p>
          </>
        ) : (
          <>
            <span className="text-gray-400 mr-2">🔍</span>
            <p className="text-gray-600">
              Не найдено статей по запросу "{searchQuery}"
            </p>
          </>
        )}
      </div>
    </div>
  );
}
