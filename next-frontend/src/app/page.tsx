'use client';

import Report from '@/components/reports/Report';
import { useReports } from '@/queries/useReports';
import { Button, List, ListItem, Stack } from '@mui/material';
import Link from 'next/link';

const Home = () => {
  const { data } = useReports();

  return (
    <Stack>
      <List>{data?.map((report) => <Report key={report.id_zprava} {...report} />)}</List>

      <Button component={Link} href="/report/create/1" variant="contained">
        Vytvořit zprávu
      </Button>
    </Stack>
  );
};

export default Home;
