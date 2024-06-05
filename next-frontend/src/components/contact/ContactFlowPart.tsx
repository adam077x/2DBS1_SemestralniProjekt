'use client';

import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import ContactForm from './ContactForm';
import Contacts from './Contacts';
import { useState } from 'react';
import StyledBox from '../misc/StyledBox';
import { useBoolean } from '@/hooks/useBoolean';
import Link from 'next/link';

const ContactFlowPart = ({ stage, id }: { stage: number; id?: number }) => {
  const [contactFormOpened, setContactFormOpened] = useBoolean();

  return (
    <Stack sx={{ width: '96vw' }}>
      <Stack justifyContent={'space-between'} direction={'row'}>
        <Typography variant="h5">Kontakty</Typography>
        <Button variant="contained" onClick={setContactFormOpened.on} disabled={contactFormOpened}>
          Vytvořit kontakt
        </Button>
      </Stack>

      <Contacts id_zprava={id || 0} />

      <Button variant="contained" component={Link} href={`/report/${id}`}>
        Otevřit přehled zprávy
      </Button>

      <Modal open={contactFormOpened} onClose={setContactFormOpened.off}>
        <StyledBox>
          <ContactForm stage={stage} id={id} close={setContactFormOpened.off} />
        </StyledBox>
      </Modal>
    </Stack>
  );
};

export default ContactFlowPart;
