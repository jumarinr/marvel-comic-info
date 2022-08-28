import { useLocation } from 'react-router-dom';

import React from 'react';

import { PAGE_CHARACTERS, PAGE_COMICS } from '../utils/constants';

import BasicViewComic from './BasicViewComic';

const VIEW_BY_PAGE = new Map([
  [PAGE_CHARACTERS, BasicViewComic],
  [PAGE_COMICS, BasicViewComic],
]);

const BasicView = () => {
  const { pathname } = useLocation();

  const FiltersComponent = VIEW_BY_PAGE.get(pathname);

  return (
    <FiltersComponent />
  );
};

BasicView.propTypes = {};

export default BasicView;
