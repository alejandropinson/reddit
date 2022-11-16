import { Child } from '../models/PostsData';
import PostListItem from './PostListItem';

interface PostListProps {
  posts: Child[];
}

const PostList = ({ posts }: PostListProps) => (
  <>
    {posts.map((post, index) => (
      <PostListItem index={index + 1} post={post.data} />
    ))}
  </>
);

export default PostList;
