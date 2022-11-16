import axios from 'axios';
import { RootObject as PostRootObject } from '../models/PostData';
import { RootObject as PostsRootObject } from '../models/PostsData';

export const fetchAllPosts = async (): Promise<PostsRootObject> => {
  const response = await axios.get<PostsRootObject>(
    'https://www.reddit.com/r/all.json'
  );

  return response.data;
};

export const fetchPost = async (path: string): Promise<PostRootObject> => {
  const trimmedPath = path.replace(/^\/+|\/+$/g, '');

  const response = await axios.get<PostRootObject>(
    `https://www.reddit.com/r/${trimmedPath}.json`
  );

  return response.data;
};
