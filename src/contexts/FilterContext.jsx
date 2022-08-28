import { createContext } from 'react';

const value = {
  params: {},
  setParams: () => null,
  searchItems: () => [],
  selected: null,
  setSelected: () => null,
  isComputer: true,
};

const FilterContext = createContext(value);

export default FilterContext;
