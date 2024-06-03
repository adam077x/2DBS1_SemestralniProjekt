import { useMeausres } from '@/queries/useMeasures';
import { CircularProgress, Stack } from '@mui/material';
import Measure from './Measure';

const Measures = ({ id_zprava }: { id_zprava: number }) => {
  const { data, isLoading } = useMeausres({ id_zprava });

  return (
    <Stack>
      {!isLoading && (
        <Stack>
          {data?.map((measure) => <Measure key={measure.id_zprava} popis={measure.popis} naklady={measure.naklady} />)}
        </Stack>
      )}

      {isLoading && <CircularProgress />}
    </Stack>
  );
};

export default Measures;
