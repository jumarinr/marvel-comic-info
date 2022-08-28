import React from 'react';

// material ui core
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

const NoData = () => (
  <Stack alignItems="center">
    <Alert variant="outlined" severity="warning">
      No se encontraron resultados con los filtros seleccionados,
      intenta de nuevo con otros filtros
    </Alert>
  </Stack>
);

NoData.propTypes = {};

export default NoData;
