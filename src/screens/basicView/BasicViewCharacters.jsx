import React, {
  useContext, useEffect, useState, useMemo,
} from 'react';

// material ui core
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

// material ui icons
import FindInPageIcon from '@mui/icons-material/FindInPage';

import { getComicsByCharacter } from '../utils/getMarvel';
import {
  DEFAULT_PAGE_LIMIT,
  IMGE_TYPE, IMG_NOT_FOUND, IMG_SIZE_DIMENSIONS, IMG_TYPE_FILTER,
} from '../utils/constants';

import FilterContext from '../../contexts/FilterContext';
import LoadingResult from '../loading/LoadingResult';
import { buildLimitAndSkip } from '../utils/helpers';
import LoadingList from '../loading/LoadingList';

const BasicViewCharacters = () => {
  const { selected } = useContext(FilterContext);

  const [isLoading, setIsLoading] = useState(true);
  const [imgUrl, setImgUrl] = useState(`${selected.thumbnail.path}${IMGE_TYPE}`);
  const [currentPage, setCurrentPage] = useState(1);
  const [comicsCount, setComicsCount] = useState(0);
  const [comics, setComics] = useState([]);
  const [loadingComics, setLoadingComics] = useState(false);

  const onErrorPhoto = () => setImgUrl(`${IMG_NOT_FOUND}${IMGE_TYPE}`);

  useEffect(() => {
    async function getListComics(paramsSearch) {
      setLoadingComics(true);
      const {
        limit = DEFAULT_PAGE_LIMIT,
        pageSelected = 1,
      } = paramsSearch;

      try {
        const result = await getComicsByCharacter({
          characterId: selected.id,
          ...buildLimitAndSkip({
            limit,
            page: pageSelected,
          }),
        });
        setComicsCount(result.total);
        setComics(result.comics);
      } catch (error) {
        console.error(error);
        if (currentPage !== 1) {
          setCurrentPage((lastPage) => lastPage - 1);
        }

        setComics([]);
        setComicsCount(0);
      } finally {
        setLoadingComics(false);
      }
    }

    if (selected) {
      getListComics({ pageSelected: currentPage });
    }
  }, [selected, currentPage]);

  useEffect(() => {
    function configImg() {
      setIsLoading(true);
      try {
        setImgUrl(`${selected.thumbnail.path}${IMGE_TYPE}`);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    configImg();
  }, [selected]);

  const numberOfPages = useMemo(() => Math.ceil(comicsCount / DEFAULT_PAGE_LIMIT), [comicsCount]);

  const handleChange = (_event, value) => setCurrentPage(value);

  if (isLoading) {
    return (
      <Grid item xs={12}>
        <LoadingResult />
      </Grid>
    );
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h5" gutterBottom>
          {selected.name}
        </Typography>

        <Grid container spacing={1}>
          <Grid item xs>
            <Typography variant="h6" gutterBottom>
              Foto:
            </Typography>
            <CardMedia
              id="portada"
              component="img"
              sx={{ ...IMG_SIZE_DIMENSIONS }}
              image={imgUrl}
              alt={selected.title}
              onError={onErrorPhoto}
            />
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Descripción:
            </Typography>
            <Typography variant="body2" gutterBottom>
              {selected.description}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" className="container-flex-left">
              Aparece en:
              <Badge ml={2} badgeContent={comicsCount} color="primary" showZero max={1000}>
                <FindInPageIcon />
              </Badge>
            </Typography>
            {!loadingComics
              ? (
                <>
                  <Stack alignItems="left">
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
                  <List>
                    {comics.map((character) => (
                      <ListItem disablePadding key={character.title}>
                        <ListItemButton>
                          <ListItemAvatar>
                            <Avatar alt={character.title} src={`${character.thumbnail.path}${IMG_TYPE_FILTER}`} variant="rounded" />
                          </ListItemAvatar>
                          <ListItemText primary={character.title} />
                        </ListItemButton>
                      </ListItem>
                    )) }
                  </List>
                </>
              )
              : <LoadingList />}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

BasicViewCharacters.propTypes = {
};

export default BasicViewCharacters;
