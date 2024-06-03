import { useCreateContact } from '@/queries/useCreateContact';
import { Alert, Button, CircularProgress, Container, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import { object, string } from 'yup';

const ContactForm = ({ stage, id }: { stage: number, id?: number }) => {
  const router = useRouter();

  const { mutate, isPending, error } = useCreateContact({
    onSuccess: () => {
      router.push(`/report/${id}/create/${Number(stage) + 1}`);
    },
  });

  const formik = useFormik({
    initialValues: {
      jmeno: '',
      stredni_jmeno: '',
      prijmeni: '',
      telefonni_cislo: '',
      email: '',
      popis: '',
    },
    validationSchema: object({
      jmeno: string().required('Required'),
      stredni_jmeno: string().required('Required'),
      prijmeni: string().required('Required'),
      telefonni_cislo: string().required('Required'),
      email: string().required('Required'),
      popis: string().required('Required'),
    }),
    onSubmit: (values) => {
      if(!id) {
        throw new Error('Missing report id');
      }

      mutate({
        ...values,
        zpravaId: id,
      });
    },
  });

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Kontakt
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="Jmeno"
          type="text"
          fullWidth
          margin="normal"
          variant="outlined"
          {...formik.getFieldProps('jmeno')}
          error={formik.touched.jmeno && Boolean(formik.errors.jmeno)}
          helperText={formik.touched.jmeno && formik.errors.jmeno}
          required
        />

        <TextField
          label="Střední jméno"
          type="text"
          fullWidth
          margin="normal"
          variant="outlined"
          {...formik.getFieldProps('stredni_jmeno')}
          error={formik.touched.stredni_jmeno && Boolean(formik.errors.stredni_jmeno)}
          helperText={formik.touched.stredni_jmeno && formik.errors.stredni_jmeno}
          required
        />

        <TextField
          label="Přijmení"
          type="text"
          fullWidth
          margin="normal"
          variant="outlined"
          {...formik.getFieldProps('prijmeni')}
          error={formik.touched.prijmeni && Boolean(formik.errors.prijmeni)}
          helperText={formik.touched.prijmeni && formik.errors.prijmeni}
          required
        />

        <TextField
          label="Email"
          type="text"
          fullWidth
          margin="normal"
          variant="outlined"
          {...formik.getFieldProps('email')}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          required
        />

        <TextField
          label="Telefonní číslo"
          type="text"
          fullWidth
          margin="normal"
          variant="outlined"
          {...formik.getFieldProps('telefonni_cislo')}
          error={formik.touched.telefonni_cislo && Boolean(formik.errors.telefonni_cislo)}
          helperText={formik.touched.telefonni_cislo && formik.errors.telefonni_cislo}
          required
        />

        <Button type="submit" variant="contained" color="primary" fullWidth disabled={isPending}>
          {isPending ? <CircularProgress size={24} /> : 'Pokračovat'}
        </Button>
      </form>
      {error && (
        <Alert severity="error" style={{ marginTop: '16px' }}>
          {error.message}
        </Alert>
      )}
    </Container>
  );
};

export default ContactForm;
