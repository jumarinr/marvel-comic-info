import React, { useState } from 'react';
import PropTypes from 'prop-types';

// material ui core
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import InputLabel from '@mui/material/InputLabel';

const SortMenu = ({ options, name, handleChangeParams }) => {
  const [open, setOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const anchorRef = React.useRef(null);

  const handleMenuItemClick = (value) => () => {
    setSelectedIndex(value);
    setOpen(false);
    handleChangeParams({
      name,
      value: options[value].value,
    });
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  return (
    <>
      <InputLabel htmlFor="order-menu">Ordenar Por:</InputLabel>
      <ButtonGroup variant="outlined" ref={anchorRef} id="order-menu">
        <Button size="medium">{options[selectedIndex].label}</Button>
        <Button size="medium" onClick={handleToggle}>
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Popper
        sx={{ zIndex: 1 }}
        open={open}
        anchorEl={anchorRef.current}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom'
                ? 'center top'
                : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option.value}
                      selected={index === selectedIndex}
                      onClick={handleMenuItemClick(index)}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </>
  );
};

SortMenu.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  handleChangeParams: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default SortMenu;
