'use client';

import { Stack, Typography } from '@mui/material';

const TextLabel = ({ label, text }: { label: string; text: string }) => {
  return (
    <Stack display={'flex'} direction={'row'} justifyContent={'space-between'}>
      <Typography color="grey">{label}:</Typography>
      <Typography>{text}</Typography>
    </Stack>
  );
};

export default TextLabel;
