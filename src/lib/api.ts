import { Post } from "@/types/post";
import axios, { AxiosResponse } from "axios";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const postsApi = {
  getAllPosts: (): Promise<AxiosResponse<Post[]>> => api.get<Post[]>("/posts"),
  getPostById: (id: number): Promise<AxiosResponse<Post>> =>
    api.get<Post>(`/posts/${id}`),
};