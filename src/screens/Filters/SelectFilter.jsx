import _ from 'lodash';

import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

// material ui core
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import { NO_OPTIONS } from './constants';

const SelectFilter = ({
  options, label, name, handleChangeParams,
}) => {
  const [selected, setSelected] = useState(null);

  const handleChange = (event) => {
    const { value } = event.target;

    if (value === NO_OPTIONS) {
      setSelected(null);

      handleChangeParams({
        name,
        value: null,
      });
      return;
    }

    setSelected(value);

    handleChangeParams({
      name,
      value,
    });
  };

  const newOptions = useMemo(() => _.concat([NO_OPTIONS], options), [options]);

  return (
    <>
      <InputLabel id="unic-select">{label}</InputLabel>
      <Select
        labelId="unic-select"
        id="unic-select"
        value={selected || ''}
        onChange={handleChange}
        input={<OutlinedInput label={label} />}
        fullWidth
      >
        {newOptions.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </>
  );
};

SelectFilter.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  label: PropTypes.string.isRequired,
  handleChangeParams: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default SelectFilter;
