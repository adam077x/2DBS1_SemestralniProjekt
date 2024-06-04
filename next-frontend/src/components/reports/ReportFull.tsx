'use client';

import { useReport } from '@/queries/useReport';
import { CircularProgress, Stack, Typography } from '@mui/material';
import TextLabel from '../misc/TextLabel';
import Contacts from '../contact/Contacts';
import FeedbackForm from '../feedback/FeedbackForm';
import FeedbackList from '../feedback/FeedbackList';
import Measures from '../measures/Measures';
import MeasureForm from '../measures/MeasureForm';

const ReportFull = ({ id }: { id: number }) => {
  const { data, isLoading } = useReport(id);

  return (
    <Stack>
      {!isLoading && (
        <Stack gap={2}>
          <Stack>
            <Typography variant="h5">Obecné informace</Typography>
            <TextLabel label="Titulek" text={data.titulek}></TextLabel>
            <TextLabel label="Popisek" text={data.popisek}></TextLabel>
            <TextLabel text={data.nazev_1} label="Téma"></TextLabel>
            <TextLabel label="Vytvoreno" text={data.vytvoreno}></TextLabel>
            <TextLabel label="Upraveno" text={data.upraveno}></TextLabel>
          </Stack>

          <Stack>
            <Typography variant="h5">Uživatel</Typography>
            <TextLabel text={data.jmeno_1} label="Jméno"></TextLabel>
            <TextLabel text={data.stredni_jmeno_1 || 'Není'} label="Střední jméno"></TextLabel>
            <TextLabel text={data.prijmeni_1} label="Přijmení"></TextLabel>
            <TextLabel text={data.email_1} label="Email"></TextLabel>
            <TextLabel text={data.telefonni_cislo_1} label="Telefonní číslo"></TextLabel>
          </Stack>
        </Stack>
      )}
      {isLoading && <CircularProgress />}

      <Typography variant="h5">Kontakty</Typography>
      <Contacts id_zprava={id} />

      <Typography variant="h5">Zpětná vazba</Typography>

      <FeedbackList id_zpravy={id} />
      <FeedbackForm id={id} />

      <Typography variant="h5">Opatření</Typography>
      <Measures id_zprava={id} />
      <MeasureForm id={id} />
    </Stack>
  );
};

export default ReportFull;
