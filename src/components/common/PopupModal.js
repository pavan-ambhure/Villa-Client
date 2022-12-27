import { CardHeader } from '@material-ui/core';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Modal,
  Typography,
} from '@mui/material';
import React from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,

  pt: 2,
  pl: 2,
  pb: 0,
  pr: 0,
};

export default function PopupModal(props) {
  return (
    <>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Card sx={style}>
          <CardHeader title={props.title} />

          <CardContent>{props.children}</CardContent>
          <CardActions sx={{ float: 'right' }}>
            <Button
              variant='contained'
              color='error'
              onClick={props.handleClose}
            >
              Cancel
            </Button>
            <Button
              variant='contained'
              color='success'
              onClick={props.handleSave}
            >
              Save
            </Button>
          </CardActions>
        </Card>
      </Modal>
    </>
  );
}
