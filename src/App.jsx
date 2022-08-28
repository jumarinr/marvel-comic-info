import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import React, { Suspense, useState } from 'react';

// material ui core
import Grid from '@mui/material/Grid';

import './App.css';

import { PAGE_CHARACTERS, PAGE_COMICS } from './screens/utils/constants';

import LoadingPage from './screens/loading/LoadingPage';
import themeLight from './config/themeLight';
import NavBarDesktop from './screens/NavBar/NavBarDesktop';

const Characters = React.lazy(() => import('./screens/characters/Characters'));
const Comics = React.lazy(() => import('./screens/comics/Comics'));
const Home = React.lazy(() => import('./screens/home/Home'));
const StandarPage = React.lazy(() => import('./screens/StandarPage/StandarPage'));

const App = () => {
  const [openFilters, setopenFilters] = useState(false);

  const handleFilters = () => setopenFilters((prev) => !prev);

  return (
    <ThemeProvider theme={themeLight}>
      <BrowserRouter>
        <NavBarDesktop handleFilters={handleFilters} />
        <Grid container alignItems="center" justifyContent="center">
          <Grid item xs={12} md={11}>
            <Suspense fallback={<LoadingPage />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path={PAGE_CHARACTERS}
                  element={(
                    <StandarPage
                      component={Characters}
                      openFilters={openFilters}
                      handleFilters={handleFilters}
                    />
                  )}
                />
                <Route
                  path={PAGE_COMICS}
                  element={(
                    <StandarPage
                      component={Comics}
                      openFilters={openFilters}
                      handleFilters={handleFilters}
                    />
                  )}
                />
                <Route path="*" element={<Home />} replace />
              </Routes>
            </Suspense>
          </Grid>
        </Grid>

      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
