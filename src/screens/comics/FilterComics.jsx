import _ from 'lodash';

import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';

// material ui core
import Autocomplete from '@mui/material/Autocomplete';
import Avatar from '@mui/material/Avatar';
import CircularProgress from '@mui/material/CircularProgress';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import TextField from '@mui/material/TextField';

import { equalOptions, getTitleComic } from '../utils/helpers';
import { getComics } from '../utils/getMarvel';
import { DEFAULT_PAGE_LIMIT, IMG_TYPE_FILTER } from '../utils/constants';

import FilterContext from '../../contexts/FilterContext';

const FilterComics = ({ setComics }) => {
  const { params = {} } = useContext(FilterContext);

  const [options, setOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState([]);

  const handleOpenSelect = () => setOpen(!open);

  const searchComics = async (event) => {
    try {
      const { value } = event.target;
      const searchParams = {
        limit: DEFAULT_PAGE_LIMIT,
        titleStartsWith: value,
      };

      if (params?.formatType === 'collection') {
        searchParams.formatType = params?.formatType;
      }
      const result = await getComics(searchParams);

      setOptions(result.comics);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const onSelect = (value) => () => {
    setOpen(false);
    setSelected((prev) => {
      const prevClonned = _.cloneDeep(prev);
      prevClonned.push(value);
      return prevClonned;
    });
  };

  const onChange = (_details, value) => {
    setSelected(value);
  };

  useEffect(() => {
    setComics(selected);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <Autocomplete
      id="asynchronous-search-characters"
      open={open}
      autoSelect
      multiple
      onOpen={handleOpenSelect}
      onClose={handleOpenSelect}
      isOptionEqualToValue={equalOptions}
      getOptionLabel={getTitleComic}
      options={options}
      loading={isLoading}
      value={selected}
      onInput={_.debounce(searchComics, 500)}
      onBeforeInput={() => setIsLoading(true)}
      closeText="Borrar personaje"
      onChange={onChange}
      noOptionsText="No se encontraron personajes"
      renderOption={(_details, option) => (
        <ListItem disablePadding onClick={onSelect(option)} key={option.title}>
          <ListItemButton>
            <ListItemAvatar>
              <Avatar alt={option.title} src={`${option.thumbnail.path}${IMG_TYPE_FILTER}`} />
            </ListItemAvatar>
            <ListItemText primary={option.title} />
          </ListItemButton>
        </ListItem>
      )}
      renderInput={(paramsMui) => (
        <TextField
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...paramsMui}
          label="Ingrese su comic favorito!"
          variant="outlined"
          InputProps={{
            ...paramsMui.InputProps,
            endAdornment: (
              <>
                {isLoading
                  ? <CircularProgress color="inherit" size={20} />
                  : null}
                {paramsMui.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

FilterComics.propTypes = {
  setComics: PropTypes.func.isRequired,
};

export default FilterComics;
