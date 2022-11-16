import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { Box, IconButton, Link, Typography } from '@mui/material';
import { formatDistance } from 'date-fns';
import { Data2 } from '../models/PostsData';
import './PostListItem.css';

interface PostListItemProps {
  index: number;
  post: Data2;
}

const numberFormatter = Intl.NumberFormat('en', { notation: 'compact' });

interface RichTextProps {
  title: string;
  image: string;
  type: string;
  text: string;
}

export const RichText = ({ title, image, type, text }: RichTextProps) => {
  switch (type) {
    case 'emoji':
      return (
        <span
          className='RichTextEmoji'
          title={title}
          style={{ backgroundImage: `url(${image})` }}
        ></span>
      );
    case 'text':
      return <span>{text}</span>;
    default:
      return <span></span>;
  }
};

const PostListItem = ({ index, post }: PostListItemProps) => (
  <Box display='flex'>
    {index}
    <Box display='flex' flexDirection='column' alignItems='center'>
      <IconButton>
        <ArrowUpward />
      </IconButton>
      {numberFormatter.format(post.ups)}
      <IconButton>
        <ArrowDownward />
      </IconButton>
    </Box>
    <img
      src={post.thumbnail}
      height={post.thumbnail_height}
      width={post.thumbnail_width}
      alt={post.title}
    />
    <Box>
      <Box>
        <Link href={post.url}>{post.title}</Link>
        <Typography variant='caption'> ({post.domain})</Typography>
        <Box className='RichTextContainer'>
          {post.link_flair_richtext.map((item) => (
            <RichText
              type={item.e}
              title={item.a}
              image={item.u}
              text={item.t}
            />
          ))}
        </Box>
      </Box>
      <Box>
        <Typography variant='caption'>
          submitted{' '}
          {formatDistance(new Date(post.created * 1000), new Date(), {
            addSuffix: true,
          })}{' '}
          by {post.author} to {post.subreddit_name_prefixed}
        </Typography>
        <Box>
          <Link href='#' variant='caption'>
            {post.num_comments} comments
          </Link>{' '}
          <Link href='#' variant='caption'>
            share
          </Link>{' '}
          <Link href='#' variant='caption'>
            save
          </Link>{' '}
          <Link href='#' variant='caption'>
            hide
          </Link>{' '}
          <Link href='#' variant='caption'>
            give award
          </Link>{' '}
          <Link href='#' variant='caption'>
            repost
          </Link>{' '}
          <Link href='#' variant='caption'>
            crosspost
          </Link>
        </Box>
      </Box>
    </Box>
  </Box>
);

export default PostListItem;
