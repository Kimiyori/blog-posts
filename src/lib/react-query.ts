import { QueryClient } from "@tanstack/react-query";

const DEFAULT_STALE_TIME = 5 * 60 * 1000; // 5 minutes

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: DEFAULT_STALE_TIME,
      refetchOnWindowFocus: false,
    },
  },
});
