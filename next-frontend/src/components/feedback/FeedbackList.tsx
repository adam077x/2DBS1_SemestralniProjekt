import { useFeedbackList } from '@/queries/useFeedbackList';
import { CircularProgress, Stack, Typography } from '@mui/material';
import Feedback from './Feedback';

const FeedbackList = ({ id_zpravy }: { id_zpravy: number }) => {
  const { data, isLoading } = useFeedbackList(id_zpravy);

  return (
    <Stack>
      {isLoading && <CircularProgress />}
      {!isLoading &&
        data?.map((feedback) => (
          <Feedback
            zpetna_vazba={feedback.zpetna_vazba}
            key={feedback.id_zpetna_vazba}
            email={feedback.email}
            jmeno={feedback.jmeno}
            stredni_jmeno={feedback.stredni_jmeno}
            prijmeni={feedback.prijmeni}
          />
        ))}

      {!isLoading && data?.length === 0 && <Typography>Zatím nebyla přidána žádná zpětná vazba.</Typography>}
    </Stack>
  );
};

export default FeedbackList;
