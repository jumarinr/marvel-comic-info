import React, { useContext } from 'react';

// material ui core
import Grid from '@mui/material/Grid';

import { CHARACTER_ORDER_BY } from './constants';

import FilterContext from '../../contexts/FilterContext';
import SortMenu from './SortMenu';
import FilterForComics from './FilterForComics';

const FilterCharacters = () => {
  const { setParams } = useContext(FilterContext);

  const handleChangeParams = ({ name, value }) => setParams((prev) => ({
    ...prev,
    [name]: value,
  }));

  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <FilterForComics />
      </Grid>
      <Grid item xs={12}>
        <SortMenu
          options={CHARACTER_ORDER_BY}
          handleChangeParams={handleChangeParams}
          name="orderBy"
        />
      </Grid>
    </Grid>
  );
};

FilterCharacters.propTypes = {};

export default FilterCharacters;
