import React, { useState } from 'react';

// material ui core
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Slide from '@mui/material/Slide';
import Typography from '@mui/material/Typography';

// material ui icons
import HelpCenterIcon from '@mui/icons-material/HelpCenter';

const parseLocalStorage = (rawData) => {
  try {
    return JSON.parse(rawData);
  } catch (error) {
    return undefined;
  }
};

// eslint-disable-next-line react/jsx-props-no-spreading
const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const Info = () => {
  const [hasEntered, setHasEntered] = useState(parseLocalStorage(localStorage.getItem('hasEntered')));
  const [openInfo, setOpenInfo] = useState(false);

  const handleOpenInfo = () => setOpenInfo((prev) => !prev);

  const handleFilters = () => {
    localStorage.setItem('hasEntered', true);
    setHasEntered(true);
    handleOpenInfo();
  };

  return (
    <>
      <Box sx={{ color: 'action.active' }}>
        <IconButton onClick={handleFilters} color="primary">
          {!hasEntered
            ? (
              <Badge color="primary" variant="dot">
                <HelpCenterIcon />
              </Badge>
            )
            : <HelpCenterIcon /> }
        </IconButton>
      </Box>

      <Dialog
        open={openInfo}
        TransitionComponent={Transition}
        onClose={handleOpenInfo}
        aria-describedby="modal-info-comic"
      >
        <DialogContent>
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography variant="h4" gutterBottom>
                # Proyecto para consumir el API expuesta por Marvel
              </Typography>

              <Typography variant="h5">
                ## Documentación del API usada:
              </Typography>

              <Typography variant="subtitle1" gutterBottom>
                <a target="_blank" href="https://developer.marvel.com/docs" rel="noreferrer">https://developer.marvel.com/docs</a>
              </Typography>

              <Typography variant="h5">
                ## Funcionalidades de la aplicación:
              </Typography>

              <Typography variant="subtitle1" gutterBottom>
                <ul>
                  <li>
                    Permitir mostrar los comics de marvel en forma paginada y filtrarlos
                    por personajes,
                    formato, tipo de formato. Adicionalmente posee la opción de ordenar por nombre
                    y fecha de venta
                  </li>
                  <li>
                    Permitir mostrar los personajes de marvel en forma paginada y filtrarlos por
                    comics en los que aparecen. Adicionalmente posee la opción de ordenar por nombre
                    y modificación de este
                  </li>
                </ul>
              </Typography>

              <Typography variant="h5">
                ## Proyecto en github:
              </Typography>

              <Typography variant="subtitle1" gutterBottom>
                <a target="_blank" href="https://github.com/jumarinr/marvel-comic-info" rel="noreferrer">Marvel comic info</a>
              </Typography>

            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Info;
