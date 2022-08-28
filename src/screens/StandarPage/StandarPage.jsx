/* eslint-disable react/jsx-props-no-spreading */

import { useMediaQuery } from 'react-responsive';

import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

// material ui core
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import Filters from '../Filters/Filters';
import FilterContext from '../../contexts/FilterContext';
import BasicView from '../comics/BasicView';

const StandarPage = ({ component: Component, ...restOfProps }) => {
  const [params, setParams] = useState({});
  const [selected, setSelected] = useState(null);

  const isDesktopOrLaptop = useMediaQuery({
    query: '(min-device-width: 1224px)',
  });

  const isBigScreen = useMediaQuery({ query: '(min-device-width: 1824px)' });
  const isComputer = isDesktopOrLaptop || isBigScreen;

  const searchItems = (searchSon) => searchSon();

  const value = useMemo(() => ({
    params,
    setParams,
    searchItems,
    selected,
    setSelected,
    isComputer,
  }), [params, selected, isComputer]);

  const basicView = useMemo(
    () => (selected
      ? (
        <Grid item xs={12}>
          <BasicView />
        </Grid>
      )
      : null),

    [selected],
  );

  return (
    <FilterContext.Provider value={value}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={9}>
          <Grid container alignItems="center" justifyContent="center">
            <Grid item xs={11}>
              <Component {...restOfProps} />
            </Grid>
          </Grid>
        </Grid>
        {isComputer
          ? (
            <Grid item xs={12} md={3}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Typography variant="subtitle2">
                    Selecciona los filtros de búsqueda que
                    necesites para poder obtener la información requerida
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Filters />
                </Grid>
                <Grid item xs={12}>
                  <Divider variant="fullWidth" />
                </Grid>
                {basicView}
              </Grid>
            </Grid>
          )
          : null}
      </Grid>
    </FilterContext.Provider>
  );
};

StandarPage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  component: PropTypes.object.isRequired,
};

export default StandarPage;
