"use client";

import { ErrorBoundary as ReactErrorBoundary } from "react-error-boundary";
import { ReactNode } from "react";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps) {
  const customMessage =
    error.message || "Произошла неожиданная ошибка при загрузке содержимого.";

  return (
    <div className="text-center bg-red-50 border border-red-200 rounded-xl p-12">
      <div className="text-red-500 text-8xl mb-6">⚠️</div>
      <h2 className="text-3xl font-bold text-red-700 mb-4">
        Что-то пошло не так
      </h2>
      <p className="text-red-600 mb-6">{customMessage}</p>
      <div className="space-y-4">
        <button
          onClick={resetErrorBoundary}
          className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-red-600 to-pink-600 text-white rounded-xl hover:from-red-700 hover:to-pink-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1"
        >
          Попробовать снова
        </button>
        <p className="text-sm text-gray-500">
          Если проблема не исчезает, обновите страницу или обратитесь в
          поддержку.
        </p>
      </div>
    </div>
  );
}

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: React.ComponentType<ErrorFallbackProps>;
}

export function ErrorBoundary({ children, fallback }: ErrorBoundaryProps) {
  return (
    <ReactErrorBoundary
      FallbackComponent={fallback || ErrorFallback}
      onError={(error, errorInfo) => {
        console.error("ErrorBoundary caught an error:", error, errorInfo);
      }}
      onReset={() => {
        window.location.reload();
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
}

export class CustomError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CustomError";
  }
}
