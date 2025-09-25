import type { Metadata } from "next";
import "./globals.css";
import { ReactQueryProvider } from "@/components/ReactQueryProvider";
import { ErrorBoundary } from "@/components/shared";
import { Header } from "@/components/shared/Header/Header";

export const metadata: Metadata = {
  title: "DevBlog ",
  description: "Посты",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="antialiased">
        <ReactQueryProvider>
          <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
            <Header />
            <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
              <ErrorBoundary>{children}</ErrorBoundary>
            </main>
          </div>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
