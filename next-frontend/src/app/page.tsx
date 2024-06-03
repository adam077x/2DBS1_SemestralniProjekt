'use client';

import Report from '@/components/reports/Report';
import { useReports } from '@/queries/useReports';
import { List, ListItem, Stack } from '@mui/material';

const Home = () => {
  const { data } = useReports();

  return (
    <Stack>
      <List>{data?.map((report) => <Report key={report.id_zprava} {...report} />)}</List>
    </Stack>
  );
};

export default Home;
