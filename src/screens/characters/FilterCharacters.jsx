import _ from 'lodash';

import React, { useState, useEffect } from 'react';
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

import { equalOptions, getTitleCharacter } from '../utils/helpers';
import { getCharacters } from '../utils/getMarvel';
import { DEFAULT_PAGE_LIMIT, IMG_TYPE_FILTER } from '../utils/constants';

const FilterCharacters = ({ setCharacters }) => {
  const [options, setOptions] = useState([]);
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selected, setSelected] = useState([]);

  const handleOpenSelect = () => setOpen(!open);

  const searchCharacters = async (event) => {
    try {
      const { value } = event.target;
      const result = await getCharacters({
        limit: DEFAULT_PAGE_LIMIT,
        nameStartsWith: value,
      });
      setOptions(result.characters);
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
    setCharacters(selected);
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
      getOptionLabel={getTitleCharacter}
      options={options}
      loading={isLoading}
      value={selected}
      onInput={_.debounce(searchCharacters, 500)}
      onBeforeInput={() => setIsLoading(true)}
      closeText="Borrar personaje"
      onChange={onChange}
      noOptionsText="No se encontraron personajes"
      renderOption={(_details, option) => (
        <ListItem disablePadding onClick={onSelect(option)} key={option.name}>
          <ListItemButton>
            <ListItemAvatar>
              <Avatar alt={option.name} src={`${option.thumbnail.path}${IMG_TYPE_FILTER}`} />
            </ListItemAvatar>
            <ListItemText primary={option.name} />
          </ListItemButton>
        </ListItem>
      )}
      renderInput={(params) => (
        <TextField
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...params}
          label="Ingrese su personaje favorito!"
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading
                  ? <CircularProgress color="inherit" size={20} />
                  : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
    />
  );
};

FilterCharacters.propTypes = {
  setCharacters: PropTypes.func.isRequired,
};

export default FilterCharacters;
