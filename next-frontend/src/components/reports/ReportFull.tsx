'use client';

import { useReport } from '@/queries/useReport';
import { Button, CircularProgress, Divider, Stack, Typography } from '@mui/material';
import TextLabel from '../misc/TextLabel';
import Contacts from '../contact/Contacts';
import FeedbackForm from '../feedback/FeedbackForm';
import FeedbackList from '../feedback/FeedbackList';
import Measures from '../measures/Measures';
import MeasureForm from '../measures/MeasureForm';
import ContactsGrid from '../contact/ContactsGrid';
import { format } from 'date-fns';
import MeasureModal from '../measures/MeasureModal';
import { useBoolean } from '@/hooks/useBoolean';

const ReportFull = ({ id }: { id: number }) => {
  const { data, isLoading } = useReport(id);

  const [measureModalOpened, setMeasureModalOpened] = useBoolean();

  return (
    <Stack>
      {!isLoading && (
        <Stack gap={2}>
          <Typography variant="h4" fontWeight="bold">
            {data.titulek}
          </Typography>

          <Divider />

          <Stack direction="row" justifyContent="space-between">
            <Stack width="50%" mr={2} bgcolor="aliceblue" p={2}>
              <Typography variant="h5">Obecné informace</Typography>
              <TextLabel label="Titulek" text={data.titulek}></TextLabel>
              <TextLabel label="Popisek" text={data.popisek}></TextLabel>
              <TextLabel text={data.nazev_1} label="Téma"></TextLabel>
              <TextLabel label="Vytvoreno" text={format(new Date(data.vytvoreno), 'yyyy-MM-dd HH:mm')}></TextLabel>
              <TextLabel label="Upraveno" text={format(new Date(data.upraveno), 'yyyy-MM-dd HH:mm')}></TextLabel>
            </Stack>

            <Stack width="50%" ml={2} bgcolor="aliceblue" p={2}>
              <Typography variant="h5">Autor</Typography>
              <TextLabel text={data.jmeno_1} label="Jméno"></TextLabel>
              <TextLabel text={data.stredni_jmeno_1 || 'Není'} label="Střední jméno"></TextLabel>
              <TextLabel text={data.prijmeni_1} label="Přijmení"></TextLabel>
              <TextLabel text={data.email_1} label="Email"></TextLabel>
              <TextLabel text={data.telefonni_cislo_1} label="Telefonní číslo"></TextLabel>
            </Stack>
          </Stack>
        </Stack>
      )}
      {isLoading && <CircularProgress />}

      <Stack my={2}>
        <Divider />
      </Stack>

      <Typography variant="h5">Kontakty</Typography>
      <ContactsGrid id_zprava={id} />

      <Stack my={2}>
        <Divider />
      </Stack>

      <Stack>
        <Stack justifyContent="space-between" direction="row" mb={2}>
          <Typography variant="h5">Opatření</Typography>
          <Button onClick={setMeasureModalOpened.on} variant="contained">
            Vytvořit opatření
          </Button>
        </Stack>
        <Measures id_zprava={id} />
        <MeasureModal measureModalOpened={measureModalOpened} onClose={setMeasureModalOpened.off} id={id} />
      </Stack>

      <Stack my={2}>
        <Divider />
      </Stack>

      <Typography variant="h5">Zpětná vazba</Typography>

      <FeedbackList id_zpravy={id} />
      <FeedbackForm id={id} />
    </Stack>
  );
};

export default ReportFull;
