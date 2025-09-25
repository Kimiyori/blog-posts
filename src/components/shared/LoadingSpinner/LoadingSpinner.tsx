interface LoadingSpinnerProps {
  message?: string;
}

export function LoadingSpinner({
  message = "Загрузка...",
}: LoadingSpinnerProps) {
  return (
    <div className="flex justify-center items-center min-h-96">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600"></div>
        <p className="text-gray-600 font-medium">{message}</p>
      </div>
    </div>
  );
}
