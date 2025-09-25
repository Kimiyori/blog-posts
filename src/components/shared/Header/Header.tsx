"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 shadow-lg border-b border-purple-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link
              href="/"
              className="text-2xl font-bold text-white hover:text-blue-100 transition-colors"
            >
              DevBlog
            </Link>
            <nav className="flex space-x-1">
              <Link
                href="/"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive("/")
                    ? "bg-white/20 text-white shadow-lg backdrop-blur-sm"
                    : "text-blue-100 hover:text-white hover:bg-white/10"
                }`}
              >
                Главная
              </Link>
              <Link
                href="/search"
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive("/search")
                    ? "bg-white/20 text-white shadow-lg backdrop-blur-sm"
                    : "text-blue-100 hover:text-white hover:bg-white/10"
                }`}
              >
                Поиск
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}
