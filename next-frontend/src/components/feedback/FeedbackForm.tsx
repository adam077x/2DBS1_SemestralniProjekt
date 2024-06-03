import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { object, string } from 'yup';

const FeedbackForm = () => {
  const formik = useFormik({
    initialValues: {
      zpetna_vazba: '',
    },
    validationSchema: object({
      zpetna_vazba: string().required('Required'),
    }),
    onSubmit: (values) => {

    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        label="Zpetna vazba"
        type="text"
        {...formik.getFieldProps('zpetna_vazba')}
        error={formik.touched.zpetna_vazba && Boolean(formik.errors.zpetna_vazba)}
        helperText={formik.touched.zpetna_vazba && formik.errors.zpetna_vazba}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth>
        Vytvořit
      </Button>
    </form>
  );
};

export default FeedbackForm;
