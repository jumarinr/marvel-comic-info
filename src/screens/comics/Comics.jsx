import _ from 'lodash';

import React, {
  useEffect, useState, useMemo, useContext,
} from 'react';

// material ui core
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import { getComics } from '../utils/getMarvel';
import { DEFAULT_PAGE_LIMIT } from '../utils/constants';
import { buildLimitAndSkip } from '../utils/helpers';

import LoadingResults from '../loading/LoadingResults';
import ComicCard from './ComicCard';
import FilterContext from '../../contexts/FilterContext';
import FilterComics from './FilterComics';

const Comics = () => {
  const { params, searchItems } = useContext(FilterContext);

  const [currentPage, setCurrentPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getListComics = (paramsSearch = {}) => async () => {
    setIsLoading(true);
    const {
      limit = DEFAULT_PAGE_LIMIT,
      pageSelected = 1,
      ...otherParams
    } = paramsSearch;

    try {
      const result = await getComics({
        ...otherParams,
        ...buildLimitAndSkip({
          limit,
          page: pageSelected,
        }),
      });

      setTotal(result.total);
      setResults(result.comics);
    } catch (error) {
      console.error(error);
      if (currentPage !== 1) {
        setCurrentPage((lastPage) => lastPage - 1);
      }

      setResults([]);
      setTotal(0);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const callFunction = getListComics({
      ...params,
      pageSelected: currentPage,
    });

    searchItems(callFunction);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, currentPage]);

  const handleChange = (_event, value) => setCurrentPage(value);

  const setComics = (characters) => {
    if (_.isEmpty(characters)) {
      getListComics({ ...params, pageSelected: currentPage })();
    } else {
      setResults(characters);
      setTotal(_.size(characters));
    }
  };

  const numberOfPages = useMemo(() => Math.ceil(total / DEFAULT_PAGE_LIMIT), [total]);
  const renderOfLoadingPage = useMemo(() => (isLoading ? <LoadingResults /> : null), [isLoading]);

  return (
    <Grid container spacing={3} justifyContent="center" alignItems="center">
      <Grid item xs={12}>
        <Stack alignItems="center">
          <Pagination
            count={numberOfPages}
            shape="rounded"
            color="primary"
            showFirstButton
            siblingCount={0}
            variant="outlined"
            showLastButton
            page={currentPage}
            onChange={handleChange}
            size="large"
          />
        </Stack>
      </Grid>
      <Grid item xs={12}>
        <FilterComics setComics={setComics} />
      </Grid>
      <Grid item xs={12}>
        {!_.isEmpty(results) && !isLoading
          ? (
            <Grid container spacing={3}>
              {results.map((comic) => (
                <Grid item xs={12} sm={12} md={12} lg={6} key={comic.id}>
                  <ComicCard comic={comic} />
                </Grid>
              ))}
            </Grid>
          )
          : renderOfLoadingPage}
      </Grid>
      <Grid item xs={12}>
        <Stack alignItems="center">
          <Pagination
            count={numberOfPages}
            shape="rounded"
            color="primary"
            showFirstButton
            siblingCount={0}
            variant="outlined"
            showLastButton
            page={currentPage}
            onChange={handleChange}
            sx={{ size: { xs: 'small', lg: 'large' } }}
          />
        </Stack>
      </Grid>
    </Grid>
  );
};

Comics.propTypes = {};

export default Comics;
