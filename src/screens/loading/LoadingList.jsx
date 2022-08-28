import React from 'react';

// material ui core
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const LoadingList = () => (
  <Grid container spacing={3}>
    <Grid item xs={12}>
      <Stack alignItems="left">
        <Pagination
          count={0}
          shape="rounded"
          color="primary"
          showFirstButton
          siblingCount={0}
          variant="outlined"
          showLastButton
          size="large"
        />
      </Stack>
    </Grid>
    <Grid item xs={12}>
      <Skeleton variant="rectangular" />
    </Grid>

    <Grid item xs={12}>
      <Skeleton variant="rectangular" />
    </Grid>

    <Grid item xs={12}>
      <Skeleton variant="rectangular" />
    </Grid>

    <Grid item xs={12}>
      <Skeleton variant="rectangular" />
    </Grid>

  </Grid>
);

LoadingList.propTypes = {};

export default LoadingList;
