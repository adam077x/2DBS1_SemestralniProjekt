import { useContacts } from '@/queries/useContacts';
import { CircularProgress, Stack } from '@mui/material';
import Contact from './Contact';

const Contacts = ({ id_zprava }: { id_zprava: number }) => {
  const { data, isLoading } = useContacts(id_zprava);

  return (
    <Stack>
      {!isLoading &&
        data?.map((contact) => (
          <Contact
            key={contact.id_kontakt}
            jmeno={contact.jmeno}
            prijmeni={contact.prijmeni}
            stredni_jmeno={contact.stredni_jmeno}
            telefonni_cislo={contact.telefonni_cislo}
            email={contact.email}
            popis={contact.popis}
          />
        ))}
      {isLoading && <CircularProgress />}
    </Stack>
  );
};

export default Contacts;
