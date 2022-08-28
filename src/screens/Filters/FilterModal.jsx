import React from 'react';
import PropTypes from 'prop-types';

// material ui core
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Grid from '@mui/material/Grid';
import Slide from '@mui/material/Slide';

import Filters from './Filters';

// eslint-disable-next-line react/jsx-props-no-spreading
const Transition = React.forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

const FilterModal = ({ openModal: open, handleModal }) => (
  <Dialog
    open={open}
    TransitionComponent={Transition}
    onClose={handleModal}
    aria-describedby="modal-filter-comic"
    keepMounted
  >
    <DialogContent>
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Filters />
        </Grid>
      </Grid>
    </DialogContent>
  </Dialog>
);

FilterModal.propTypes = {
  openModal: PropTypes.bool.isRequired,
  handleModal: PropTypes.func.isRequired,
};

export default FilterModal;
