import { Box, Link } from '@mui/material';

const LinkButton = (props: React.PropsWithChildren) => (
  <Box mr={1}>
    <Link
      component='button'
      variant='caption'
      color='text.secondary'
      fontWeight={700}
    >
      {props.children}
    </Link>
  </Box>
);

export default LinkButton;
