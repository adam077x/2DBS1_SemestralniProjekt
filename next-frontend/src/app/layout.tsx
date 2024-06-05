import type { Metadata } from 'next';
import ThemeProvider from '../components/ThemeProvider';
import QueryClientProvider from '../components/QueryClientProvider';
import { Stack } from '@mui/material';
import Navigation from '@/components/navigation/Navigation';

export const metadata: Metadata = {
  title: 'Systém zpráv',
  description: 'System zprav',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider>
          <ThemeProvider>
            <Navigation />
            <Stack mx={5} my={2}>
              {children}
            </Stack>
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
