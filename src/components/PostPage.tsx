import { useLocation } from 'react-router-dom';
import { usePost } from '../queries/posts';

const PostPage = () => {
  const location = useLocation();
  const { pathname } = location;

  const post = usePost(pathname);

  if (post.error) {
    return <>page not found</>;
  }

  if (post.isLoading) {
    return <>loading...</>;
  }

  return <>{JSON.stringify(post.data)}</>;
};
export default PostPage;
