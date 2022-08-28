import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

// material ui core
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { IMGE_TYPE, IMG_SIZE_DIMENSIONS, IMG_NOT_FOUND } from '../utils/constants';

import FilterContext from '../../contexts/FilterContext';

const CONTAINER_SIZE = 0.6 * IMG_SIZE_DIMENSIONS.height;

const ComicCard = ({ comic }) => {
  const { setSelected } = useContext(FilterContext);

  const [imgUrl, setImgUrl] = useState(`${comic.thumbnail.path}${IMGE_TYPE}`);

  const onErrorPhoto = () => setImgUrl(`${IMG_NOT_FOUND}${IMGE_TYPE}`);

  const onClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    setSelected(comic);
  };

  return (
    <ButtonBase
      focusRipple
      key={comic.title}
      sx={{ height: IMG_SIZE_DIMENSIONS.height }}
      onClick={onClick}
    >
      <Card sx={{
        display: 'flex',
        justifyContent: 'space-between',
        height: IMG_SIZE_DIMENSIONS.height,
        width: '100%',
      }}
      >
        <CardMedia
          component="img"
          sx={{ ...IMG_SIZE_DIMENSIONS }}
          image={imgUrl}
          alt={comic.title}
          onError={onErrorPhoto}
        />
        <Box>
          <CardContent>
            <Grid container>
              <Grid item xs={12}>
                <Typography gutterBottom variant="h5">
                  {comic.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ maxHeight: CONTAINER_SIZE, overflow: 'auto' }}>
                  {comic.description || 'Comic sin descripción :('}
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Box>
      </Card>
    </ButtonBase>
  );
};

ComicCard.propTypes = {
  comic: PropTypes.shape({
    title: PropTypes.string.isRequired,
    thumbnail: PropTypes.shape({
      path: PropTypes.string.isRequired,
    }),
    description: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
};

export default ComicCard;
