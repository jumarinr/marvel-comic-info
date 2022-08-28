import React, { useState } from 'react';
import PropTypes from 'prop-types';

// material ui core
import InputLabel from '@mui/material/InputLabel';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

const FilterToggle = ({
  options, label, handleChangeParams, name,
}) => {
  const [selected, setSelected] = useState(options[0]);

  const handleChange = (_event, newSelected) => {
    setSelected(newSelected);
    handleChangeParams({
      name,
      value: newSelected,
    });
  };

  const optionsMenu = options.map((option) => (
    <ToggleButton value={option} key={option}>
      {option}
    </ToggleButton>
  ));

  return (
    <>
      <InputLabel htmlFor="order-menu">{label}</InputLabel>
      <ToggleButtonGroup
        size="small"
        value={selected}
        onChange={handleChange}
        exclusive
        color="primary"
      >
        {optionsMenu}
      </ToggleButtonGroup>
    </>
  );
};

FilterToggle.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  label: PropTypes.string.isRequired,
  handleChangeParams: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default FilterToggle;
