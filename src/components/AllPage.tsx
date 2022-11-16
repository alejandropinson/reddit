import { usePosts } from '../queries/posts';

const AllPage = () => {
  const posts = usePosts();

  if (posts.isLoading) {
    return <>loading...</>;
  }

  return <>{JSON.stringify(posts.data)}</>;
};

export default AllPage;
