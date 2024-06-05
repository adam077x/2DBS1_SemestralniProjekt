import { useContacts } from '@/queries/useContacts';
import { CircularProgress, Grid } from '@mui/material';
import Contact from './Contact';

const ContactsGrid = ({ id_zprava }: { id_zprava: number }) => {
  const { data, isLoading } = useContacts(id_zprava);

  return (
    <Grid container spacing={2}>
      {!isLoading &&
        data?.map((contact) => (
          <Grid key={contact.id_kontakt} item xs={12} sm={6} md={6}>
            <Contact {...contact} />
          </Grid>
        ))}

      {isLoading && <CircularProgress />}
    </Grid>
  );
};

export default ContactsGrid;
