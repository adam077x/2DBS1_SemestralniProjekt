'use client';

import ContactForm from '@/components/contact/ContactForm';
import Flow, { Stage } from '@/components/misc/Flow';
import ReportForm from '@/components/reports/ReportForm';
import { Stack } from '@mui/material';

const ReportCreationPage = ({ stage, id }: { stage: number; id?: number }) => {
  const stages: Stage[] = [
    {
      component: <ReportForm stage={stage} />,
      name: 'Vytvořit zprávu',
    },
    {
      component: <ContactForm stage={stage} id={id} />,
      name: 'Vytvořit kontakty',
    },
  ];

  return (
    <Stack>
      <Flow stage={stage} stages={stages} />
    </Stack>
  );
};

export default ReportCreationPage;
