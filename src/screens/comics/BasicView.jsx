import _ from 'lodash';

import React, { useContext, useEffect, useState } from 'react';

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

// material ui icons
import FaceIcon from '@mui/icons-material/Face';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import { getCharactersByComic } from '../utils/getMarvel';
import {
  IMGE_TYPE, IMG_NOT_FOUND, IMG_SIZE_DIMENSIONS, IMG_TYPE_FILTER,
} from '../utils/constants';

import FilterContext from '../../contexts/FilterContext';
import LoadingResult from '../loading/LoadingResult';

const BasicView = () => {
  const { selected } = useContext(FilterContext);

  const [isLoading, setIsLoading] = useState(true);
  const [characters, setCharacters] = useState([]);
  const [imgUrl, setImgUrl] = useState(`${selected.thumbnail.path}${IMGE_TYPE}`);

  const onErrorPhoto = () => setImgUrl(`${IMG_NOT_FOUND}${IMGE_TYPE}`);

  useEffect(() => {
    async function searchComicById() {
      setIsLoading(true);
      try {
        const result = await getCharactersByComic({
          comicId: selected.id,
        });

        setCharacters(result.characters);
        setImgUrl(`${selected.thumbnail.path}${IMGE_TYPE}`);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }

    searchComicById();
  }, [selected]);

  const prices = _.orderBy(_.uniq(_.map(selected?.prices, 'price')));

  return (
    <Grid container>
      {!isLoading
        ? (
          <Grid item xs={12}>
            <Typography variant="h5" gutterBottom>
              {selected.title}
            </Typography>

            <Grid container spacing={1}>
              <Grid item>
                <Typography variant="h6" gutterBottom>
                  Portada:
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

              <Grid item xs>
                <Typography variant="h6" gutterBottom>
                  Descripción:
                </Typography>
                <Typography variant="body2" gutterBottom>
                  {selected.description}
                </Typography>
              </Grid>

              <Grid item xs={6} className="container-flex-left">
                <Typography variant="h6">
                  Páginas:
                </Typography>
                <Typography variant="subtitle1" ml={1}>
                  {selected.pageCount}
                </Typography>
              </Grid>

              <Grid item xs={6} className="container-flex-left">
                <Typography variant="h6">
                  Formato:
                </Typography>
                <Typography variant="subtitle1" ml={1}>
                  {selected.format}
                </Typography>
              </Grid>

              <Grid item xs={6}>
                <Typography variant="h6" className="container-flex-left">
                  Personajes:
                  <Badge ml={2} badgeContent={_.size(characters)} color="primary" showZero>
                    <FaceIcon />
                  </Badge>
                </Typography>

                <List>
                  {characters.map((character) => (
                    <ListItem disablePadding key={character.name}>
                      <ListItemButton>
                        <ListItemAvatar>
                          <Avatar alt={character.name} src={`${character.thumbnail.path}${IMG_TYPE_FILTER}`} />
                        </ListItemAvatar>
                        <ListItemText primary={character.name} />
                      </ListItemButton>
                    </ListItem>
                  )) }
                </List>
              </Grid>

              <Grid item xs={6}>
                <div className="container-flex-left">
                  <Typography variant="h6" gutterBottom>
                    Precios:
                    <Badge badgeContent={_.size(prices)} color="primary" showZero>
                      <AttachMoneyIcon />
                    </Badge>
                  </Typography>
                </div>

                {prices.map((price) => (
                  <Typography variant="subtitle1" key={price}>
                    {`$${price} USD`}
                  </Typography>
                ))}
              </Grid>
            </Grid>
          </Grid>
        )
        : (
          <Grid item xs={12}>
            <LoadingResult />
          </Grid>
        )}
    </Grid>
  );
};

BasicView.propTypes = {
};

export default BasicView;
