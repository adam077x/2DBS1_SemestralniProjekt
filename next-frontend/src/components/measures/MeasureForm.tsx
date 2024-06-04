import { useCreateMeasure } from '@/queries/useCreateMeasure';
import { Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import { number, object, string } from 'yup';

const MeasureForm = ({ id }: { id: number }) => {
  const { mutate, isPending } = useCreateMeasure();

  const formik = useFormik({
    initialValues: {
      popis: '',
      naklady: null,
    },
    validationSchema: object({
      popis: string().required('Required'),
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
        name="popis"
        value={formik.values.popis}
        onChange={formik.handleChange}
        error={formik.touched.popis && Boolean(formik.errors.popis)}
        helperText={formik.touched.popis && formik.errors.popis}
        fullWidth
        margin="normal"
      />

      <TextField
        label="Náklady"
        name="naklady"
        value={formik.values.naklady}
        onChange={formik.handleChange}
        error={formik.touched.naklady && Boolean(formik.errors.naklady)}
        helperText={formik.touched.naklady && formik.errors.naklady}
        fullWidth
        margin="normal"
      />

      <Button type="submit" variant="contained" color="primary" fullWidth disabled={isPending}>
        Vytvořit
      </Button>
    </form>
  );
};

export default MeasureForm;
