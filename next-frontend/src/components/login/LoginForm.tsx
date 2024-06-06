'use client';

import React from 'react';
import { useFormik } from 'formik';
import { TextField, Button, Container, Typography, CircularProgress, Alert } from '@mui/material';
import { useLogin } from '@/queries/useLogin';
import { object, string } from 'yup';
import { useRouter } from 'next/navigation';

const LoginForm = () => {
  const router = useRouter();

  const { mutate, isPending, error, data } = useLogin({
    onSuccess: (data) => {
      console.log(data);
      document.cookie = `jwt=${data?.jwt}; path=/`;
      localStorage.setItem('logged', 'true');
      window.dispatchEvent(new Event('storage'));
      router.push('/');
    },
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: object({
      email: string().email('Invalid email address').required('Emailová adresa je povinná'),
      password: string().required('Heslo je povinné'),
    }),
    onSubmit: (values) => {
      mutate(values);
    },
  });

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" component="h1" fontWeight="bold" gutterBottom textAlign="center">
        Přihlášení
      </Typography>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          variant="outlined"
          {...formik.getFieldProps('email')}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
          required
        />
        <TextField
          label="Heslo"
          type="password"
          fullWidth
          margin="normal"
          variant="outlined"
          {...formik.getFieldProps('password')}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
          required
        />
        <Button type="submit" variant="contained" color="primary" fullWidth disabled={isPending}>
          {isPending ? <CircularProgress size={24} /> : 'Přihlásit se'}
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

export default LoginForm;
