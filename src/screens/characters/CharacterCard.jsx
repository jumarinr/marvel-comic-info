import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { IMGE_TYPE, IMG_SIZE_DIMENSIONS, IMG_NOT_FOUND } from '../utils/constants';

const CONTAINER_SIZE = 0.7 * IMG_SIZE_DIMENSIONS.height;

const CharacterCard = ({ character }) => {
  const [imgUrl, setImgUrl] = useState(`${character.thumbnail.path}${IMGE_TYPE}`);

  const onErrorPhoto = () => setImgUrl(`${IMG_NOT_FOUND}${IMGE_TYPE}`);

  return (

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
        alt={character.name}
        onError={onErrorPhoto}
      />
      <Box>
        <CardContent>
          <Grid container alignContent="flex-start">
            <Grid item>
              <Typography gutterBottom variant="h5">
                {character.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ maxHeight: CONTAINER_SIZE, overflow: 'auto' }}>
                {character.description || 'Comic sin descripción :('}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Box>
    </Card>
  );
};

CharacterCard.propTypes = {
  character: PropTypes.shape({
    name: PropTypes.string.isRequired,
    thumbnail: PropTypes.shape({
      path: PropTypes.string.isRequired,
    }),
    description: PropTypes.string,
  }).isRequired,
};

export default CharacterCard;
