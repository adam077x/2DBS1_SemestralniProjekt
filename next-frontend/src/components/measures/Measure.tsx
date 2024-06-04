import { Stack } from '@mui/material';
import TextLabel from '../misc/TextLabel';

type MeasurePropsT = {
  popis: string;
  naklady: number;
};

const Measure = ({ popis, naklady }: MeasurePropsT) => {
  return (
    <Stack>
      <TextLabel label="Popis" text={popis} />
      <TextLabel label="Náklady" text={naklady ? `${naklady.toString()}$` : 'Nejsou'} />
    </Stack>
  );
};

export default Measure;
