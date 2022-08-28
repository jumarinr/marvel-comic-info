/* eslint-disable react/jsx-props-no-spreading */

import { useTheme, useMediaQuery } from '@mui/material';

import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

// material ui core
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import Filters from '../Filters/Filters';
import FilterContext from '../../contexts/FilterContext';
import BasicView from '../basicView/BasicView';
import ModalView from '../basicView/ModalView';
import FilterModal from '../Filters/FilterModal';

const StandarPage = ({
  component: Component, handleFilters, openFilters, ...restOfProps
}) => {
  const [params, setParams] = useState({});
  const [selected, setSelected] = useState(null);
  const [openModalInfo, setOpenModalInfo] = useState(false);

  const handleModalInfo = () => setOpenModalInfo((prev) => !prev);

  const theme = useTheme();
  const isXS = useMediaQuery(theme.breakpoints.between('xs', 'md'));

  const searchItems = (searchSon) => searchSon();

  const value = useMemo(() => {
    const handleSelect = (valueSelected) => {
      if (isXS) {
        handleModalInfo();
      } else {
        window.scrollTo({
          top: 0,
          behavior: 'smooth',
        });
      }

      setSelected(valueSelected);
    };

    return {
      params,
      setParams,
      searchItems,
      selected,
      setSelected: handleSelect,
      isComputer: isXS,
    };
  }, [params, selected, isXS]);

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
        <Grid item xs={12} md={3} sx={{ display: { xs: 'none', md: 'block' } }}>
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

        <Grid item xs={12}>
          <Typography variant="caption" display="block" gutterBottom>
            Data provided by Marvel. © 2022 MARVEL
          </Typography>
        </Grid>
      </Grid>
      <ModalView handleModal={handleModalInfo} openModal={openModalInfo} />
      <FilterModal openModal={openFilters} handleModal={handleFilters} />
    </FilterContext.Provider>
  );
};

StandarPage.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  component: PropTypes.object.isRequired,
  handleFilters: PropTypes.func.isRequired,
  openFilters: PropTypes.bool.isRequired,
};

export default StandarPage;
