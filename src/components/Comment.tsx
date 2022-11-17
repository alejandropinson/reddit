import { ExpandLess, ExpandMore } from '@mui/icons-material';
import { Box, IconButton, Link, Paper, Typography } from '@mui/material';
import { formatDistance } from 'date-fns';
import { useState } from 'react';
import { Child, Data2 } from '../models/PostData';
import LinkButton from './LinkButton';

interface CommentProps {
  comment: Data2;
  indent?: number;
}

const Comment = ({ comment, indent = 0 }: CommentProps) => {
  const replies: Child[] = (comment.replies?.data?.children || []) as Child[];
  const [hidden, setHidden] = useState(false);

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
              <IconButton>
                <ExpandLess />
              </IconButton>
              <IconButton>
                <ExpandMore />
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
                    {`${comment.score} points`}
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
              {comment.body}
              <Box display='flex' mb={1}>
                <LinkButton>permalink</LinkButton>
                <LinkButton>source</LinkButton>
                <LinkButton>embed</LinkButton>
                <LinkButton>save</LinkButton>
                <LinkButton>save-RES</LinkButton>
                <LinkButton>parent</LinkButton>
                <LinkButton>report</LinkButton>
                <LinkButton>reply</LinkButton>
              </Box>
              {replies.map(({ data: reply }) => (
                <Box mb={1}>
                  <Comment comment={reply} indent={indent + 1} />
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
