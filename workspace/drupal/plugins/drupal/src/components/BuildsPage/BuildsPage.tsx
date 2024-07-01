import React from 'react';
import { Builds } from './lib/Builds';
import { Grid } from '@material-ui/core';

export const BuildsPage = () => (
  <Grid container spacing={3} direction="column">
    <Grid item>
      <Builds />
    </Grid>
  </Grid>
);
