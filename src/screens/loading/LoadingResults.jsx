import { useMediaQuery } from 'react-responsive';

import React from 'react';

// material ui core
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

import { IMG_SIZE_DIMENSIONS } from '../utils/constants';

const LoadingResults = () => {
  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1224px)',
  });

  const isBigScreen = useMediaQuery({ query: '(min-device-width: 1824px)' });
  const isComputer = isDesktopOrLaptop || isBigScreen;
  const skeletonPage = isComputer ? [...Array(3).keys()] : [0];

  return (
    <Grid container spacing={3}>
      {skeletonPage.map((skeletonConsecutive) => (
        <Grid item xs={12} sm={12} md={12} lg={4} key={skeletonConsecutive}>
          <Skeleton variant="rectangular" height={IMG_SIZE_DIMENSIONS.height} />
        </Grid>
      ))}
    </Grid>
  );
};

LoadingResults.propTypes = {};

export default LoadingResults;
