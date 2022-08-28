import { useTheme, useMediaQuery } from '@mui/material';

import React from 'react';

// material ui core
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

import { IMG_SIZE_DIMENSIONS } from '../utils/constants';

const LoadingPage = () => {
  const theme = useTheme();
  const isXS = useMediaQuery(theme.breakpoints.up('xs'));

  const skeletonPage = isXS ? [...Array(2).keys()] : [0];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={9}>
        <Skeleton variant="text" sx={{ fontSize: '4rem' }} />
      </Grid>

      <Grid item xs={12} md={9}>
        <Grid container spacing={3}>
          {skeletonPage.map((skeletonConsecutive) => (
            <Grid item xs={12} sm={12} md={12} lg={6} key={skeletonConsecutive}>
              <Skeleton
                variant="rectangular"
                height={IMG_SIZE_DIMENSIONS.height}
                sx={{
                  width: {
                    xs: '85vw', sm: '85vw', md: '60vw', lg: '30vw',
                  },
                }}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

LoadingPage.propTypes = {};

export default LoadingPage;
