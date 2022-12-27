import { Alert } from '@mui/material';
import React from 'react';

function AlertMessage(props) {
  return <Alert severity='error'>{props.message}</Alert>;
}

export default AlertMessage;
