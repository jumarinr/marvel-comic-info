import React, { useContext } from 'react';

// material ui core
import Grid from '@mui/material/Grid';

import { COMIC_FORMAT_TYPE, COMIC_ORDER_BY, COMIC_FORMAT } from './constants';

import SortMenu from './SortMenu';
import FilterToggle from './FilterToggle';
import SelectFilter from './SelectFilter';
import FilterContext from '../../contexts/FilterContext';
import FilterForCharacters from './FilterForCharacters';

const FilterComics = () => {
  const { setParams } = useContext(FilterContext);

  const handleChangeParams = ({ name, value }) => setParams((prev) => ({
    ...prev,
    [name]: value,
  }));

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <FilterForCharacters />
      </Grid>
      <Grid item xs={12} md={6}>
        <SelectFilter
          options={COMIC_FORMAT}
          label="Formato: "
          handleChangeParams={handleChangeParams}
          name="format"
        />
      </Grid>
      <Grid item xs={12} md={6}>
        <FilterToggle
          options={COMIC_FORMAT_TYPE}
          label="Tipo de formato: "
          handleChangeParams={handleChangeParams}
          name="formatType"
        />
      </Grid>
      <Grid item xs={12}>
        <SortMenu
          options={COMIC_ORDER_BY}
          handleChangeParams={handleChangeParams}
          name="orderBy"
        />
      </Grid>

    </Grid>
  );
};

FilterComics.propTypes = {};

export default FilterComics;
