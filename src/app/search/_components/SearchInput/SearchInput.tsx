import { FormEvent } from "react";

interface SearchInputProps {
  searchQuery: string;
  onSearchQueryChange: (query: string) => void;
  onSubmit?: (e: FormEvent) => void;
}

export function SearchInput({
  searchQuery,
  onSearchQueryChange,
  onSubmit,
}: SearchInputProps) {
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit?.(e);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-12">
      <div className="max-w-2xl mx-auto">
        <div className="relative group">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchQueryChange(e.target.value)}
            placeholder="Поиск по названию статьи"
            className="w-full pl-12 pr-4 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 text-lg placeholder-gray-400 text-black"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchQueryChange("")}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
