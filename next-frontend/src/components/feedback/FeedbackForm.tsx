import { useCreateFeedback } from '@/queries/useCreateFeedback';
import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { object, string } from 'yup';

const FeedbackForm = ({ id }: { id: number }) => {
  const { mutate, isPending } = useCreateFeedback();

  const formik = useFormik({
    initialValues: {
      zpetna_vazba: '',
    },
    validationSchema: object({
      zpetna_vazba: string().required('Required'),
    }),
    onSubmit: (values) => {
      mutate({
        zpetnaVazba: values.zpetna_vazba,
        uzivatelId: 1,
        zpravaId: id,
      });
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
      <Button type="submit" variant="contained" color="primary" fullWidth disabled={isPending}>
        Vytvořit
      </Button>
    </form>
  );
};

export default FeedbackForm;
