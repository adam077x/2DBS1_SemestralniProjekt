import { useFeedbackList } from '@/queries/useFeedbackList';
import { CircularProgress, Stack } from '@mui/material';
import Feedback from './Feedback';

const FeedbackList = ({ id_zpravy }: { id_zpravy: number }) => {
  const { data, isLoading } = useFeedbackList(id_zpravy);

  return (
    <Stack>
      {isLoading && <CircularProgress />}
      {!isLoading &&
        data?.map((feedback) => <Feedback zpetna_vazba={feedback.zpetna_vazba} key={feedback.id_zpetna_vazba} />)}
    </Stack>
  );
};

export default FeedbackList;
