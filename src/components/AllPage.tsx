import { usePosts } from '../queries/posts';
import PostList from './PostList';

const AllPage = () => {
  const posts = usePosts();

  if (posts.isLoading) {
    return <>loading...</>;
  }

  return <PostList posts={posts.data?.data.children || []} />;
};

export default AllPage;
