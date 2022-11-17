import { ExpandLess, ExpandMore } from '@mui/icons-material';
import {
  Box,
  Button,
  IconButton,
  Link,
  Paper,
  Typography,
} from '@mui/material';
import { formatDistance } from 'date-fns';
import { decode } from 'html-entities';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Child, Data2 } from '../models/PostData';
import { postComment, selectComments } from '../store/commentsSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { selectVote, vote, VoteDir } from '../store/votesSlice';
import LinkButton from './LinkButton';

interface CommentProps {
  comment: Data2;
  indent?: number;
}

const Comment = ({ comment, indent = 0 }: CommentProps) => {
  let replies: Child[] = (comment.replies?.data?.children || []) as Child[];
  const [hidden, setHidden] = useState(false);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [reply, setReply] = useState('');
  const userVote = useAppSelector(selectVote(comment.id));
  const userComments = (useAppSelector(selectComments(comment.id)) ||
    []) as Data2[];
  const dispatch = useAppDispatch();

  replies = [
    ...replies,
    ...userComments.map((comments) => ({ kind: 't1', data: comments })),
  ];

  const voteComment = (dir: VoteDir) => {
    const voteDir = userVote === dir ? VoteDir.Reset : dir;
    dispatch(vote({ id: comment.id, dir: voteDir }));
  };

  const dismissReplyBox = () => {
    setReply('');
    setShowReplyBox(false);
  };

  const saveReply = () => {
    const newComment: Partial<Data2> = {
      id: uuidv4(),
      author: 'self',
      score_hidden: false,
      score: 0,
      created: Math.floor(new Date().getTime() / 1000),
      body: reply,
    };

    dispatch(postComment({ id: comment.id, comment: newComment }));
    setReply('');
    setShowReplyBox(false);
  };

  return (
    <Paper variant='outlined'>
      <Box display='flex'>
        <Box
          display='flex'
          bgcolor={indent % 2 === 0 ? '#ffffff' : '#f5f5f5'}
          width='100%'
        >
          <Box width={40}>
            <Box display={hidden ? 'none' : 'flex'} flexDirection='column'>
              <IconButton onClick={() => voteComment(VoteDir.Upvote)}>
                <ExpandLess
                  color={userVote === VoteDir.Upvote ? 'primary' : undefined}
                />
              </IconButton>
              <IconButton onClick={() => voteComment(VoteDir.Downvote)}>
                <ExpandMore
                  color={userVote === VoteDir.Downvote ? 'primary' : undefined}
                />
              </IconButton>
            </Box>
          </Box>

          <Box p={1} width='100%'>
            <Box display='flex' alignItems='flex-end'>
              <Box mr={1}>
                <Link
                  component='button'
                  variant='caption'
                  onClick={() => setHidden(!hidden)}
                >
                  {`[${hidden ? '+' : '-'}]`}
                </Link>
              </Box>
              <Box mr={0.5}>
                <Link component='button' variant='caption' fontWeight={700}>
                  {comment.author}
                </Link>
              </Box>
              <Box mr={0.5}>
                {comment.score_hidden ? (
                  <Typography variant='caption' color='text.secondary'>
                    [score hidden]
                  </Typography>
                ) : (
                  <Typography variant='caption' fontWeight={700}>
                    {`${comment.score + (userVote || 0)} points`}
                  </Typography>
                )}
              </Box>
              <Box>
                <Typography variant='caption' color='text.secondary'>
                  {comment.created &&
                    formatDistance(
                      new Date(comment.created * 1000),
                      new Date(),
                      {
                        addSuffix: true,
                      }
                    )}
                </Typography>
              </Box>
            </Box>

            <Box display={hidden ? 'none' : 'block'}>
              <div
                dangerouslySetInnerHTML={{
                  __html: decode(comment.body_html),
                }}
              />
              <Box display='flex' mb={1}>
                <LinkButton>permalink</LinkButton>
                <LinkButton>source</LinkButton>
                <LinkButton>embed</LinkButton>
                <LinkButton>save</LinkButton>
                <LinkButton>save-RES</LinkButton>
                <LinkButton>parent</LinkButton>
                <LinkButton>report</LinkButton>
                <LinkButton onClick={() => setShowReplyBox(true)}>
                  reply
                </LinkButton>
              </Box>
              {showReplyBox && (
                <Box mb={1}>
                  <Box>
                    <textarea
                      rows={1}
                      cols={1}
                      name='text'
                      style={{ width: 500, height: 100 }}
                      value={reply}
                      onChange={(event) => setReply(event.target.value)}
                    />
                  </Box>
                  <Box display='flex'>
                    <Box mr={1}>
                      <Button
                        variant='contained'
                        color='primary'
                        size='small'
                        disableElevation
                        onClick={saveReply}
                      >
                        save
                      </Button>
                    </Box>
                    <Button
                      variant='contained'
                      color='error'
                      size='small'
                      disableElevation
                      onClick={dismissReplyBox}
                    >
                      cancel
                    </Button>
                  </Box>
                </Box>
              )}
              {replies.map(({ data, kind }, index) => (
                <Box mb={1} key={index}>
                  {kind === 't1' ? (
                    <Comment comment={data} indent={indent + 1} />
                  ) : (
                    <Box display='flex' alignItems='flex-end'>
                      <Box mr={0.5}>
                        <Link
                          component='button'
                          variant='caption'
                          color='primary'
                          fontWeight={700}
                        >
                          load more comments
                        </Link>
                      </Box>
                      <Box>
                        <Typography variant='caption' color='text.secondary'>
                          ({data.count} {data.count === 1 ? 'reply' : 'replies'}
                          )
                        </Typography>
                      </Box>
                    </Box>
                  )}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

export default Comment;
