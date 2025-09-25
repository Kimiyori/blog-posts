import { useQuery } from "@tanstack/react-query";
import { postsApi } from "@/lib/api";
import { Post } from "@/types/post";

const STALE_TIME = 5 * 60 * 1000; // 5 minutes

export function usePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const response = await postsApi.getAllPosts();
      return response.data as Post[];
    },
    staleTime: STALE_TIME,
    retry: 3,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
  });
}
