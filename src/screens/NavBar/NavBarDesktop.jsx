import { styled } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

import React from 'react';

// material ui core
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Grid from '@mui/material/Grid';

// material ui icons

import { PAGES } from '../utils/constants';

const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

const NavBarDesktop = () => {
  const navigate = useNavigate();
  const redirect = (path) => () => navigate(path);
  const location = useLocation();

  return (
    <>
      <AppBar component="nav" color="inherit">
        <Toolbar>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
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
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

NavBarDesktop.propTypes = {};

export default NavBarDesktop;
