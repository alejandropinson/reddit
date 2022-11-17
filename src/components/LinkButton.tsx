import { Box, Link } from '@mui/material';

interface LinkButtonProps extends React.PropsWithChildren {
  onClick?: () => void;
}

const LinkButton = ({ children, onClick }: LinkButtonProps) => (
  <Box mr={1}>
    <Link
      component='button'
      variant='caption'
      color='text.secondary'
      fontWeight={700}
      onClick={onClick}
    >
      {children}
    </Link>
  </Box>
);

export default LinkButton;
