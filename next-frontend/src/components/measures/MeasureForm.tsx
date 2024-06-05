import { useCreateMeasure } from '@/queries/useCreateMeasure';
import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { number, object, string } from 'yup';

const MeasureForm = ({ id, onClose }: { id: number; onClose: () => void }) => {
  const { mutate, isPending } = useCreateMeasure({
    onSuccess: onClose,
  });

  const formik = useFormik({
    initialValues: {
      popis: '',
      naklady: null,
    },
    validationSchema: object({
      popis: string().required('Popis je povinný'),
      naklady: number(),
    }),
    onSubmit: (values) => {
      mutate({
        ...values,
        zpravaId: id,
      });
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <TextField
        label="Popis"
        error={formik.touched.popis && Boolean(formik.errors.popis)}
        helperText={formik.touched.popis && formik.errors.popis}
        {...formik.getFieldProps('popis')}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Náklady"
        error={formik.touched.naklady && Boolean(formik.errors.naklady)}
        helperText={formik.touched.naklady && formik.errors.naklady}
        {...formik.getFieldProps('naklady')}
        fullWidth
        margin="normal"
        type="number"
      />

      <Button type="submit" variant="contained" color="primary" fullWidth disabled={isPending}>
        Vytvořit
      </Button>
    </form>
  );
};

export default MeasureForm;
