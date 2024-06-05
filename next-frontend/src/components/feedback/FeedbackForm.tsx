import { useCreateFeedback } from '@/queries/useCreateFeedback';
import { Button, Stack, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { object, string } from 'yup';

const FeedbackForm = ({ id }: { id: number }) => {
  const { mutate, isPending } = useCreateFeedback();

  const formik = useFormik({
    initialValues: {
      zpetna_vazba: '',
    },
    validationSchema: object({
      zpetna_vazba: string().required('Zpětna vazba je povinná'),
    }),
    onSubmit: (values) => {
      mutate({
        zpetnaVazba: values.zpetna_vazba,
        uzivatelId: 1,
        zpravaId: id,
      });

      formik.resetForm();
    },
  });

  return (
    <Stack width={300} mt={2}>
      <form onSubmit={formik.handleSubmit}>
        <Stack gap={2}>
          <TextField
            label="Zpětna vazba"
            type="text"
            {...formik.getFieldProps('zpetna_vazba')}
            error={formik.touched.zpetna_vazba && Boolean(formik.errors.zpetna_vazba)}
            helperText={formik.touched.zpetna_vazba && formik.errors.zpetna_vazba}
          />
          <Button type="submit" variant="contained" color="primary" disabled={isPending}>
            Vytvořit
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default FeedbackForm;
