import { useLocation } from 'react-router-dom';

import React from 'react';
import PropTypes from 'prop-types';

// material ui core
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import DialogContent from '@mui/material/DialogContent';

import { PAGE_CHARACTERS, PAGE_COMICS } from '../utils/constants';

import BasicViewComic from './BasicViewComic';

const VIEW_BY_PAGE = new Map([
  [PAGE_CHARACTERS, BasicViewComic],
  [PAGE_COMICS, BasicViewComic],
]);

// eslint-disable-next-line react/jsx-props-no-spreading
const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const ModalView = ({ openModal: open, handleModal }) => {
  const { pathname } = useLocation();

  const ViewComponent = VIEW_BY_PAGE.get(pathname);

  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      onClose={handleModal}
      aria-describedby="modal-info-comic"
    >
      <DialogContent>
        <Grid container spacing={4}>
          <Grid item xs={12}>
            <ViewComponent />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

ModalView.propTypes = {
  openModal: PropTypes.bool.isRequired,
  handleModal: PropTypes.func.isRequired,
};

export default ModalView;
