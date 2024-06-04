'use client';

import { ReportT } from '@/queries/useReports';
import { Button, Divider, ListItem, ListItemText, Stack } from '@mui/material';
import { useRouter } from 'next/navigation';

const Report = ({
  id_zprava,
  popisek,
  tema_id_tema,
  titulek,
  upraveno,
  uzavreno,
  uzivatel_id_uzivatel,
  vytvoreno,
}: ReportT) => {
  const router = useRouter();

  return (
    <>
      <Stack bgcolor="aliceblue" my={1}>
        <ListItem key={id_zprava}>
          <ListItemText
            primary={titulek}
            secondary={`Created: ${new Date(vytvoreno).toLocaleString()} - Updated: ${new Date(upraveno).toLocaleString()}`}
          />
          <Button onClick={() => router.push(`/report/${id_zprava}`)}>Open Report</Button>
        </ListItem>
      </Stack>

      <Divider />
    </>
  );
};

export default Report;
