import { Stack, Typography } from '@mui/material';
import TextLabel from '../misc/TextLabel';

type ContactPropsT = {
  jmeno: string;
  prijmeni: string;
  stredni_jmeno: string;
  telefonni_cislo: string;
  email: string;
  popis: string;
};

const Contact = ({ email, jmeno, popis, prijmeni, stredni_jmeno, telefonni_cislo }: ContactPropsT) => {
  return (
    <Stack >
      <Typography>
        {jmeno} {stredni_jmeno || ''} {prijmeni}
      </Typography>
      <Stack direction="row" alignItems={'center'} gap={1}>
        <Typography variant="body2">E-mail:</Typography>
        <Typography variant="body1" fontWeight={'bold'}>
          {email}
        </Typography>
      </Stack>
      <Stack direction="row" alignItems={'center'} gap={1}>
        <Typography variant="body2">Telefon:</Typography>
        <Typography variant="body1" fontWeight={'bold'}>
          {telefonni_cislo}
        </Typography>
      </Stack>
      <Stack direction="row" alignItems={'center'} gap={1}>
        <Typography variant="body2">Poznamka:</Typography>
        <Typography variant="body1">{popis}</Typography>
      </Stack>
    </Stack>
  );
};

export default Contact;
