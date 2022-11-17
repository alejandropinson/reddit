import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box, IconButton, Link, Typography } from '@mui/material';
import { formatDistance } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { Data2 } from '../models/PostsData';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectVote, vote, VoteDir } from '../store/votesSlice';
import LinkButton from './LinkButton';
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

interface ThumbnailProps {
  title: string;
  thumbnail: string;
  onClick: () => void;
}

export const Thumbnail = ({ title, thumbnail, onClick }: ThumbnailProps) => {
  switch (thumbnail) {
    case 'default':
      return (
        <Link
          component='button'
          className='DefaultThumbnail'
          onClick={onClick}
        ></Link>
      );

    default:
      return (
        <img
          src={thumbnail}
          height={56}
          width={70}
          alt={`${title} thumbnail`}
          onClick={onClick}
        />
      );
  }
};

export const RichText = ({ title, image, type, text }: RichTextProps) => {
  switch (type) {
    case 'emoji':
      return (
        <span
          className='RichTextEmoji'
          title={title}
          style={{ backgroundImage: `url(${image})` }}
        />
      );
    case 'text':
      return <span>{text}</span>;
    default:
      return <span />;
  }
};

const PostListItem = ({ index, post }: PostListItemProps) => {
  const userVote = useAppSelector(selectVote(post.id));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const navigateToPost = (post: Data2) => {
    const { url, is_reddit_media_domain, permalink } = post;

    if (is_reddit_media_domain) {
      navigate(permalink.replace('/r', ''));
    } else {
      window.open(url);
    }
  };

  const votePost = (dir: VoteDir) => {
    const voteDir = userVote === dir ? VoteDir.Reset : dir;
    dispatch(vote({ id: post.id, dir: voteDir }));
  };

  return (
    <Box p={1} display='flex'>
      <Box p={1}>
        <Typography color='text.secondary' fontWeight={700}>
          {index}
        </Typography>
      </Box>
      <Box display='flex' flexDirection='column' alignItems='center' mr={1}>
        <IconButton onClick={() => votePost(VoteDir.Upvote)} size='small'>
          <ExpandLess
            color={userVote === VoteDir.Upvote ? 'primary' : undefined}
          />
        </IconButton>
        <Typography color='text.secondary' fontWeight={700}>
          {numberFormatter.format(post.ups + (userVote || 0))}
        </Typography>
        <IconButton onClick={() => votePost(VoteDir.Downvote)} size='small'>
          <ExpandMore
            color={userVote === VoteDir.Downvote ? 'primary' : undefined}
          />
        </IconButton>
      </Box>
      {post.thumbnail && (
        <Box mr={1}>
          <Thumbnail
            title={post.title}
            thumbnail={post.thumbnail}
            onClick={() => navigateToPost(post)}
          />
        </Box>
      )}
      <Box display='flex' flexDirection='column'>
        <Box>
          <Link
            component='button'
            onClick={() => navigateToPost(post)}
            textAlign='left'
          >
            {post.title}
          </Link>
          <Typography variant='caption'> ({post.domain})</Typography>
          <Box className='RichTextContainer'>
            {post.link_flair_richtext.map((item, index) => (
              <RichText
                key={index}
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
          <Box display='flex'>
            <LinkButton>{post.num_comments} comments</LinkButton>
            <LinkButton>share</LinkButton>
            <LinkButton>save</LinkButton>
            <LinkButton>hide</LinkButton>
            <LinkButton>give award</LinkButton>
            <LinkButton>repost</LinkButton>
            <LinkButton>crosspost</LinkButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
export default PostListItem;
