import { Stack, Typography } from '@mui/material';

type FeedbackPropsT = {
  zpetna_vazba: string;
};

const Feedback = ({ zpetna_vazba }: FeedbackPropsT) => {
  return (
    <Stack>
      <Typography>{zpetna_vazba}</Typography>
    </Stack>
  );
};

export default Feedback;
