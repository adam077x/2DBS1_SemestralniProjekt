'use client'

import { Box, BoxProps } from '@mui/material';

const StyledBox: React.FC<BoxProps> = ({ children, ...props }) => {
  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'max-content',
        bgcolor: 'background.paper',
        p: 4,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default StyledBox;
