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
    <Stack>
      <TextLabel label="Jmeno" text={jmeno} />
      <TextLabel label="Střední jméno" text={stredni_jmeno} />
      <TextLabel label="Příjmení" text={prijmeni} />
      <TextLabel label="Popis" text={popis} />
      <TextLabel label="Email" text={email} />
      <TextLabel label="telefonni_cislo" text={telefonni_cislo} />
    </Stack>
  );
};

export default Contact;
