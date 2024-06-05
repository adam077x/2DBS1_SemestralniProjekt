'use client';

import { Button, Link, Stack, Typography } from '@mui/material';
import NextLink from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Navigation = () => {
  const router = useRouter();

  const [logged, setLogged] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (localStorage.getItem('logged') === 'true') {
        setLogged(true);
      } else {
        setLogged(false);
      }
    }
  }, []);

  const logOut = () => {
    localStorage.setItem('logged', 'false');
    setLogged(false);
    document.cookie = '';
    router.push('/login');
  };

  return (
    <Stack
      justifyContent="space-between"
      direction="row"
      alignItems="center"
      px={2}
      py={1}
      borderBottom={1}
      borderColor="#CCCCCC"
      gap={1}
    >
      <Typography variant="h6">Systém zpráv</Typography>

      <Stack direction="row" gap={1}>
        <Button component={NextLink} href="/">
          Zpravy
        </Button>

        <Button component={NextLink} href="/report/create/1">
          Vytovřit zprávu
        </Button>

        {logged ? (
          <Button variant="contained" onClick={logOut}>
            Odhlásit se
          </Button>
        ) : (
          <Button variant="contained" component={NextLink} href="/login">
            Přihlásit se
          </Button>
        )}
      </Stack>
    </Stack>
  );
};

export default Navigation;
