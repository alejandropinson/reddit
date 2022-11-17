import { Box, Link, Paper, Typography } from '@mui/material';
import { formatDistance } from 'date-fns';
import { useLocation } from 'react-router-dom';
import { usePost } from '../queries/posts';
import Comment from './Comment';

const numberFormatter = Intl.NumberFormat('en', { notation: 'compact' });

const PostPage = () => {
  const location = useLocation();
  const { pathname } = location;

  const { data, error, isLoading } = usePost(pathname);
  const post = data?.[0].data.children[0].data;
  const comments = data?.[1].data.children;

  if (isLoading) {
    return <>loading...</>;
  }

  if (error || !post || !comments) {
    return <>page not found</>;
  }

  return (
    <Box p={2} bgcolor='#f5f5f5'>
      <Box mb={2}>
        <Paper variant='outlined'>
          <Box p={1} display='flex' bgcolor='#ffffff'>
            <Box p={1}>
              <Typography color='text.secondary' fontWeight={700}>
                {numberFormatter.format(post.ups)}
              </Typography>
            </Box>
            <Box>
              <Box display='flex'>
                {post.thumbnail && (
                  <Box mr={1}>
                    <img
                      src={post.thumbnail}
                      height={70}
                      width={70}
                      alt={post.title}
                    />
                  </Box>
                )}
                <Box
                  display='flex'
                  flexDirection='column'
                  alignItems='flex-start'
                >
                  <Box>
                    <Link component='button' variant='h6' textAlign='left'>
                      {post.title}
                    </Link>
                    <Typography variant='caption'> ({post.domain})</Typography>
                  </Box>
                  <Typography variant='caption'>
                    submitted{' '}
                    {formatDistance(new Date(post.created * 1000), new Date(), {
                      addSuffix: true,
                    })}{' '}
                    by <Link href='#'>{post.author}</Link>
                  </Typography>
                  <Link
                    component='button'
                    variant='caption'
                    fontWeight={700}
                    color='text.secondary'
                  >
                    {post.num_comments} comments
                  </Link>
                </Box>
              </Box>
              <Box p={1}>
                {post.selftext}
                {post.preview &&
                  post.preview.images.map((image, index) => (
                    <img
                      key={index}
                      alt={post.title}
                      src={image.source.url}
                      width={image.source.width}
                      height={image.source.height}
                    ></img>
                  ))}
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
      {comments.map(({ data: comment }, index) => (
        <Box mb={2} key={index}>
          <Comment comment={comment} />
        </Box>
      ))}
    </Box>
  );
};
export default PostPage;
