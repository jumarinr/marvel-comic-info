import React from 'react';
import PropTypes from 'prop-types';

// material ui core
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import Slide from '@mui/material/Slide';

import BasicView from './BasicView';

// eslint-disable-next-line react/jsx-props-no-spreading
const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const ModalView = ({ openModal: open, handleModal }) => (
  <Dialog
    open={open}
    TransitionComponent={Transition}
    onClose={handleModal}
    aria-describedby="modal-info-comic"
  >
    <DialogContent>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <BasicView />
        </Grid>
      </Grid>
    </DialogContent>
  </Dialog>
);

ModalView.propTypes = {
  openModal: PropTypes.bool.isRequired,
  handleModal: PropTypes.func.isRequired,
};

export default ModalView;
