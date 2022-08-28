import React from 'react';
import PropTypes from 'prop-types';

// material ui core
import Skeleton from '@mui/material/Skeleton';
import Grid from '@mui/material/Grid';

import { IMG_SIZE_DIMENSIONS } from '../utils/constants';

const HALF_HEIGHT = 0.5 * IMG_SIZE_DIMENSIONS.height;

const LoadingResult = ({ height, width }) => (
  <Grid container spacing={3}>
    <Grid item xs={12}>
      <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
    </Grid>
    <Grid item xs>
      <Skeleton variant="rectangular" sx={{ height, width }} />
    </Grid>
    <Grid item xs={12}>
      <Skeleton variant="rectangular" sx={{ height: HALF_HEIGHT }} />
    </Grid>

    <Grid item xs={6}>
      <Skeleton variant="rectangular" />
    </Grid>

    <Grid item xs={6}>
      <Skeleton variant="rectangular" />
    </Grid>

    <Grid item xs={6}>
      <Skeleton variant="rectangular" />
    </Grid>

    <Grid item xs={6}>
      <Skeleton variant="rectangular" />
    </Grid>

  </Grid>

);

LoadingResult.defaultProps = {
  height: IMG_SIZE_DIMENSIONS.height,
  width: IMG_SIZE_DIMENSIONS.width,
};

LoadingResult.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number,
};

export default LoadingResult;
