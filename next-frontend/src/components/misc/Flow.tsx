'use client';

import { Alert, Stack, Typography } from '@mui/material';
import React from 'react';

export type Stage = {
  name: string;
  component: React.ReactNode;
};

const Flow = ({ stage, stages }: { stage: number; stages: Stage[] }) => {
  return (
    <Stack gap={2}>
      {/*      <Stack direction="row" gap={2}>
        {stages.map((s, i) => {
          return (
            <Typography key={i} color={i + 1 <= stage ? 'black' : 'grey'}>
              {s.name}
            </Typography>
          );
        })}
      </Stack>*/}

      {stages.map((s, i) => {
        if (i + 1 !== Number(stage)) {
          return null;
        }

        return (
          <Stack key={i} direction={'row'} gap={2}>
            <Stack>{s.component}</Stack>
          </Stack>
        );
      })}
    </Stack>
  );
};

export default Flow;
