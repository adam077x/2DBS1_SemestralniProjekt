import { useMeausres } from '@/queries/useMeasures';
import { CircularProgress, Divider, Stack, Typography } from '@mui/material';
import Measure from './Measure';

const Measures = ({ id_zprava }: { id_zprava: number }) => {
  const { data, isLoading } = useMeausres({ id_zprava });

  return (
    <Stack>
      {!isLoading && (
        <Stack>
          {data?.map((measure, measureIdx) => (
            <>
              <Measure key={measure.id_zprava} popis={measure.popis} naklady={measure.naklady} />
              {measureIdx !== data.length - 1 && (
                <Stack my={2}>
                  <Divider />
                </Stack>
              )}
            </>
          ))}

          {!isLoading && data?.length === 0 && <Typography>Zatím nebyly přidány žádné opatření.</Typography>}
        </Stack>
      )}

      {isLoading && <CircularProgress />}
    </Stack>
  );
};

export default Measures;
