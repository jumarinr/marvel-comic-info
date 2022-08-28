import { useLocation } from 'react-router-dom';

import React from 'react';

import { PAGE_CHARACTERS, PAGE_COMICS } from '../utils/constants';

import FilterCharacters from './FilterCharacters';
import FilterComics from './FilterComics';

const FILTER_BY_PAGE = new Map([
  [PAGE_CHARACTERS, FilterCharacters],
  [PAGE_COMICS, FilterComics],
]);

const Filters = () => {
  const { pathname } = useLocation();

  const FiltersComponent = FILTER_BY_PAGE.get(pathname);

  return (
    <FiltersComponent />
  );
};

Filters.propTypes = {};

export default Filters;
