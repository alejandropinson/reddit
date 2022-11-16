import { useQuery } from '@tanstack/react-query';
import { fetchAllPosts, fetchPost } from '../api/postApi';

export const usePosts = () =>
  useQuery({ queryKey: ['posts'], queryFn: fetchAllPosts });

export const usePost = (path: string) =>
  useQuery({ queryKey: ['post'], queryFn: () => fetchPost(path) });
