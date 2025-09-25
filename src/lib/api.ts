import axios from "axios";

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const postsApi = {
  getAllPosts: () => api.get("/posts"),
  getPostById: (id: number) => api.get(`/posts/${id}`),
};
