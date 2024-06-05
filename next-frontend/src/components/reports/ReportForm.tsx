'use client';

import React from 'react';
import { useFormik } from 'formik';
import { TextField, Button, Container, Typography, CircularProgress, Alert } from '@mui/material';
import { object, string } from 'yup';
import { useRouter } from 'next/navigation';
import { useCreateReport } from '@/queries/useCreateReport';

const ReportForm = ({ stage }: { stage: number }) => {
  const router = useRouter();

  const { mutate, isPending, error } = useCreateReport({
    onSuccess: ({ id_zprava }) => {
      router.push(`/report/${id_zprava}/create/${Number(stage) + 1}`);
    },
  });

  const formik = useFormik({
    initialValues: {
      temaId: 1,
      nazev: '',
      popis: '',
      uzivatelId: 1,
    },
    validationSchema: object({
      nazev: string().required('Zadejte název zprávy'),
      popis: string().required('Zadejte popis zprávy'),
      temaId: string().required('Required'),
      uzivatelId: string().required('Required'),
    }),
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" gutterBottom>
        Create Report
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="Nazev"
          type="text"
          fullWidth
          margin="normal"
          variant="outlined"
          {...formik.getFieldProps('nazev')}
          error={formik.touched.nazev && Boolean(formik.errors.nazev)}
          helperText={formik.touched.nazev && formik.errors.nazev}
          required
        />

        <TextField
          label="Popis"
          type="text"
          fullWidth
          margin="normal"
          variant="outlined"
          {...formik.getFieldProps('popis')}
          error={formik.touched.popis && Boolean(formik.errors.popis)}
          helperText={formik.touched.popis && formik.errors.popis}
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

export default ReportForm;
