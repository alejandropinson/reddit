import axios from 'axios';
import {
  Data as PostData,
  Data as PostsData,
  RootObject as PostRootObject,
  RootObject as PostsRootObject,
} from '../models/PostsData';

export const fetchAllPosts = async (): Promise<PostsData> => {
  const response = await axios.get<PostsRootObject>(
    'https://www.reddit.com/r/all.json'
  );

  return response.data.data;
};

export const fetchPost = async (path: string): Promise<PostData> => {
  const response = await axios.get<PostRootObject>(
    `https://www.reddit.com/r/${path}`
  );

  return response.data.data;
};
