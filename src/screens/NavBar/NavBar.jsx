import { styled } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

import React from 'react';
import PropTypes from 'prop-types';

// material ui core
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';

// material ui icons
import FilterAltIcon from '@mui/icons-material/FilterAlt';

import { PAGES } from '../utils/constants';

import Info from '../home/Info';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const NavBar = ({ handleFilters }) => {
  const navigate = useNavigate();
  const redirect = (path) => () => navigate(path);
  const location = useLocation();

  return (
    <>
      <AppBar component="nav" color="inherit">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container alignItems="center" justifyContent="center">
              <Grid item xs={12} md={11}>
                <Grid container spacing={1}>
                  <Grid item xs>
                    {PAGES.map((page) => (
                      <Button
                        key={page}
                        onClick={redirect(page)}
                        color="primary"
                        variant={location.pathname === page ? 'contained' : 'outlined'}
                      >
                        {page}
                      </Button>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
          <Info />
          <Box sx={{ display: { xs: 'block', md: 'none' }, float: 'right' }}>
            <IconButton onClick={handleFilters} color="primary">
              <FilterAltIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

NavBar.propTypes = {
  handleFilters: PropTypes.func.isRequired,
};

export default NavBar;
