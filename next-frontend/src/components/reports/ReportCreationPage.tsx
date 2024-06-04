'use client';

import ContactForm from '@/components/contact/ContactForm';
import Flow, { Stage } from '@/components/misc/Flow';
import ReportForm from '@/components/reports/ReportForm';
import { Stack } from '@mui/material';
import Contacts from '../contact/Contacts';
import ContactFlowPart from '../contact/ContactFlowPart';

const ReportCreationPage = ({ stage, id }: { stage: number; id?: number }) => {
  const stages: Stage[] = [
    {
      component: <ReportForm stage={stage} />,
      name: 'Vytvořit zprávu',
    },
    {
      component: <ContactFlowPart id={id} stage={stage} />,
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
