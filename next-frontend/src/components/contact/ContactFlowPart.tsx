import { Button, Stack, Typography } from '@mui/material';
import ContactForm from './ContactForm';
import Contacts from './Contacts';
import { useState } from 'react';

const ContactFlowPart = ({ stage, id }: { stage: number; id?: number }) => {
  const [contactFormOpened, setContactFormOpened] = useState(false);

  return (
    <Stack sx={{ width: '96vw'}}>
      <Stack justifyContent={'space-between'} direction={'row'}>
        <Typography variant="h5">Kontakty</Typography>
        <Button variant="contained" onClick={() => setContactFormOpened(true)} disabled={contactFormOpened}>
          Vytvořit kontakt
        </Button>
      </Stack>

      <Contacts id_zprava={id || 0} />

      {contactFormOpened && <ContactForm stage={stage} id={id} />}
    </Stack>
  );
};

export default ContactFlowPart;
