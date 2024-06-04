import { Stack, Typography } from '@mui/material';

type FeedbackPropsT = {
  zpetna_vazba: string;
  email: string;
  jmeno: string;
  stredni_jmeno: string | null;
  prijmeni: string;
};

const Feedback = ({ zpetna_vazba, email, jmeno, prijmeni, stredni_jmeno }: FeedbackPropsT) => {
  return (
    <Stack>
      <Typography>{zpetna_vazba}</Typography>
      <Typography variant="body2" color="grey">
        {jmeno} {stredni_jmeno || ''} {prijmeni} - ({email})
      </Typography>
    </Stack>
  );
};

export default Feedback;
